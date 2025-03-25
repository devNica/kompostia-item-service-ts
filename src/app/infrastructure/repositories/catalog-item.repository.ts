import {
    type CatalogItemRepositoryport,
    type CtgItemFoundI,
} from '@app/application/ports/repositories/catalog-item.repository'
import { type ProductImgRaw } from '@app/domain/entities/product-img.entity'
import { type DatabaseCredentialModel } from '@core/application/models/db/database-credential.model'
import { ConflictErrorPresenter } from '@core/application/presenters/conflict-error-presenter'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { getDatabaseCrendential } from '@core/shared/configs/db-credentials'
import {
    KomposeConn,
    type KomposeSchemas,
    KomposeModels,
    KomposeQueries,
} from '@devnica/kompostia-models-ts'
import {
    DatabaseError,
    QueryError,
    QueryTypes,
    type Sequelize,
    type Transaction,
    UniqueConstraintError,
    ValidationError,
} from 'sequelize'
import { InternalServerErrorPresenter } from '@core/application/presenters/internal-server-error.presenter'
import { unwrapData } from '@core/shared/utils/object.utils'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'

class CatalogItemRepository implements CatalogItemRepositoryport {
    private readonly sequelize: Sequelize
    private transaction: Transaction
    private readonly schema: string

    constructor(credentials: DatabaseCredentialModel) {
        this.schema = credentials.DB_SCHEMA

        this.sequelize = KomposeConn.SequelizeInstance.create({
            database: credentials.DB_NAME,
            host: credentials.DB_HOST,
            user: credentials.DB_USER,
            password: credentials.DB_PASSWORD,
            schema: credentials.DB_SCHEMA,
        })
    }

    async updateCtgItemCategoryById(
        data: Pick<CtgItemRaw, 'itemId'> & { categoryId: string }
    ): Promise<void> {
        try {
            const productFound = await KomposeModels.CatalogItemModel.findByPk(
                data.itemId
            )

            if (!productFound) throw new Error('Producto no encontrado!')

            productFound.categoryId = data.categoryId

            await productFound.save()
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new ConflictErrorPresenter(error.message)
            }
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|Producto'
            )
        }
    }

    async updateCtgItemBrandById(
        data: Pick<CtgItemRaw, 'itemId'> & { brandId: string }
    ): Promise<void> {
        try {
            const productFound = await KomposeModels.CatalogItemModel.findByPk(
                data.itemId
            )

            if (!productFound) throw new Error('Producto no encontrado!')

            productFound.brandId = data.brandId

            await productFound.save()
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new ConflictErrorPresenter(error.message)
            }
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|Producto'
            )
        }
    }

    async fetchById(productId: string): Promise<CtgItemFoundI> {
        try {
            const productRaw: Omit<
                KomposeSchemas.CatalogItemSchema,
                'brandId' | 'qualityId' | 'supplierId'
            > | null = await KomposeModels.CatalogItemModel.findByPk(
                productId,
                {
                    attributes: {
                        exclude: ['qualityId', 'brandId', 'supplierId'],
                    },

                    include: [
                        {
                            model: KomposeModels.ItemBrandModel,
                            as: KomposeModels.ModelRelationshipAliases
                                .itemBrand,
                            attributes: [
                                ['id', 'brandId'],
                                ['brand_name', 'brandName'],
                            ],
                        },
                        {
                            model: KomposeModels.SupplierModel,
                            as: KomposeModels.ModelRelationshipAliases
                                .itemSupplier,
                            attributes: [
                                ['id', 'supplierId'],
                                ['supplier_code', 'supplierCode'],
                                ['supplier_name', 'supplierName'],
                            ],
                        },
                        {
                            model: KomposeModels.ItemHasLocationModel,
                            as: 'productLocation',
                        },
                    ],
                }
            )

            if (!productRaw) throw new Error('producto no encontrado')

            const product = unwrapData(productRaw)

            let locationRaw: KomposeSchemas.StorageLocationRawQuerySchema[] = []

            if (
                product?.productLocation &&
                product.productLocation.length > 0
            ) {
                locationRaw =
                    await this.sequelize.query<KomposeSchemas.StorageLocationRawQuerySchema>(
                        KomposeQueries.hierarchicalLocationRelationshipSQL(
                            this.schema
                        ),
                        {
                            replacements: {
                                locationId:
                                    product?.productLocation[0].locationId,
                            },
                            type: QueryTypes.SELECT,
                        }
                    )
            }

            const categoryRaw =
                await this.sequelize.query<KomposeSchemas.CategoryRawQuerySchema>(
                    KomposeQueries.hierarchicalCategoryRelationshipSQL(
                        this.schema
                    ),
                    {
                        replacements: {
                            categoryId: product?.categoryId,
                        },
                        type: QueryTypes.SELECT,
                    }
                )

            const imgMetaData = await this.sequelize.query<
                Omit<KomposeSchemas.FileSchema, 'binary'>
            >(KomposeQueries.getProductImagesMetadataSQL(this.schema), {
                replacements: {
                    productId: product?.id,
                },
                type: QueryTypes.SELECT,
            })

            return {
                id: product.id,
                itemName: product.productName,
                reference: product.reference,
                description: product.description,
                supplierProductCode: product.supplierProductCode,
                supplierProductName: product.supplierProductName,
                sku: product.sku,
                brand: product.productBrand,
                supplier: product.productSupplier,
                categoryRaw,
                locationRaw,
                imgMetaData,
                createdAt: Number(product.createdAt),
                isActive: product.isActive,
                updatedAt: product.updatedAt,
            } as CtgItemFoundI
        } catch (error) {
            if (
                error instanceof QueryError ||
                error instanceof ValidationError
            ) {
                throw new RequestValidationErrorPresenter(
                    'Consulta de Registro fallido'
                )
            }
            throw new InternalServerErrorPresenter(String(error))
        }
    }

    async save(
        attr: Omit<CtgItemRaw, 'brand'> & {
            brand: Required<ItemBrandRaw>
        },
        images?: ProductImgRaw[]
    ): Promise<{ productId: string }> {
        let product: KomposeSchemas.CatalogItemSchema

        try {
            // Inicializar la transaccion
            this.transaction = await this.sequelize.transaction()

            // Registrar el producto
            product = await KomposeModels.CatalogItemModel.create(
                {
                    itemName: attr.itemName,
                    description: attr.description,
                    reference: 'ref1',
                    sku: attr.sku,
                    supplierItemName: attr.supplierProductName,
                    supplierItemCode: attr.supplierProductCode,
                    supplierId: attr.supplier.supplierId,
                    categoryId: attr.category.categoryId,
                    brandId: attr.brand.brandId,
                    multiLangValues: [],
                    multiLangIsActive: false,
                    createdAt: new Date().getTime(),
                },
                { transaction: this.transaction }
            )

            // Si hay una ubicacion, asociar el producto a la ubicacion definida
            if (attr.location?.locationId) {
                await KomposeModels.ItemHasLocationModel.create(
                    {
                        itemId: product.id,
                        locationId: attr.location?.locationId,
                    },
                    { transaction: this.transaction }
                )
            }

            if (images !== undefined && images.length > 0) {
                await Promise.all(
                    images.map(async (img) => {
                        const file = await KomposeModels.FileModel.create(
                            {
                                filetype: img.filetype,
                                filesize: img.filesize,
                                binary: img.binary,
                            },
                            { transaction: this.transaction }
                        )

                        await KomposeModels.ItemHasFileModel.create(
                            {
                                fileId: file.id,
                                itemId: product.id,
                            },
                            { transaction: this.transaction }
                        )
                    })
                )
            }

            // confirmar la transaccion
            await this.transaction.commit()

            return {
                productId: product.id,
            }
        } catch (error) {
            if (
                error instanceof UniqueConstraintError ||
                error instanceof ValidationError
            ) {
                throw new ConflictErrorPresenter(String(error))
            } else {
                throw new RequestValidationErrorPresenter(
                    'Creacion de Registro fallido'
                )
            }
        }
    }
}

export const ctgItemRepositoryImpl = new CatalogItemRepository(
    getDatabaseCrendential()
)
