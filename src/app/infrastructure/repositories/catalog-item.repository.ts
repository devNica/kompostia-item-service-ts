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
    ForeignKeyConstraintError
} from 'sequelize'
import { InternalServerErrorPresenter } from '@core/application/presenters/internal-server-error.presenter'
import { unwrapData } from '@core/shared/utils/object.utils'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { MakeOptional } from '@core/application/models/app/app.model'

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

    async fetchById(itemId: string): Promise<CtgItemFoundI> {
        try {
            const itemRaw: Omit<
                KomposeSchemas.CatalogItemSchema,
                'brandId' | 'supplierId'
            > | null = await KomposeModels.CatalogItemModel.findByPk(
                itemId,
                {
                    attributes: {
                        exclude: ['brandId', 'supplierId'],
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
                            as: KomposeModels.ModelRelationshipAliases
                            .itemHasLocatiosn,
                        },
                    ],
                }
            )

            if (!itemRaw) throw new Error('producto no encontrado')

            const item = unwrapData(itemRaw)

            let locationRaw: KomposeSchemas.StorageLocationRawQuerySchema[] = []

            if (
                item?.itemHasLocations &&
                item.itemHasLocations.length > 0
            ) {
                locationRaw =
                    await this.sequelize.query<KomposeSchemas.StorageLocationRawQuerySchema>(
                        KomposeQueries.linkedListRegisteredLocationsSQL(
                            this.schema
                        ),
                        {
                            replacements: {
                                locationId:
                                    item?.itemHasLocations[0].locationId,
                            },
                            type: QueryTypes.SELECT,
                        }
                    )
            }

            const categoryRaw =
                await this.sequelize.query<KomposeSchemas.CategoryRawQuerySchema>(
                    KomposeQueries.linkedListRegisteredCategoriesSQL(
                        this.schema
                    ),
                    {
                        replacements: {
                            categoryId: item?.categoryId,
                        },
                        type: QueryTypes.SELECT,
                    }
                )

            const imgMetaData = await this.sequelize.query<
                Omit<KomposeSchemas.FileSchema, 'binary'>
            >(KomposeQueries.getProductImagesMetadataSQL(this.schema), {
                replacements: {
                    itemId: item?.id,
                },
                type: QueryTypes.SELECT,
            })

            return {
                id: item.id,
                itemName: item.itemName,
                reference: item.reference,
                description: item.description,
                supplierProductCode: item.supplierItemCode,
                supplierProductName: item.supplierItemName,
                sku: item.sku,
                brand: item.itemBrand,
                supplier: item.itemSupplier,
                categoryRaw,
                locationRaw,
                imgMetaData,
                createdAt: Number(item.createdAt),
                isActive: item.isActive,
                updatedAt: item.updatedAt,
            } as CtgItemFoundI
        } catch (error) {
            if (
                error instanceof QueryError ||
                error instanceof ForeignKeyConstraintError ||
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
        attr: MakeOptional<CtgItemRaw,'itemId'>,
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
                    reference: Math.random().toString(),
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
                error instanceof ForeignKeyConstraintError ||
                error instanceof ValidationError
            ) {
                throw new ConflictErrorPresenter(String(error))
            } else {
                throw new RepositoryErrorPresenter(
                    'Creacion de Registro fallido',
                    'Repositorio|CatalogItem'
                )
            }
        }
    }
}

export const ctgItemRepositoryImpl = new CatalogItemRepository(
    getDatabaseCrendential()
)
