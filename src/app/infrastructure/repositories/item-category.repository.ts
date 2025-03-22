import { type ItemCategoryRepositoryPort } from '@app/application/ports/repositories/item-category.repository'
import { type CtgItemDTO } from '@app/application/ports/usecases/catalog-item.usecase.port'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type DatabaseCredentialModel } from '@core/application/models/db/database-credential.model'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { getDatabaseCrendential } from '@core/shared/configs/db-credentials'
import { KomposeConn, KomposeInterfaces, KomposeModels, KomposeQueries } from '@devnica/kompostia-models-ts'
import { QueryTypes, type Sequelize } from 'sequelize'

class ItemCategoryRepository implements ItemCategoryRepositoryPort {
    private readonly sequelize: Sequelize
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

    async updateById(
        data: Omit<CategoryRaw, 'categoryId'> & { categoryId: string }
    ): Promise<void> {
        try {
            await KomposeModels.CategoryModel.update(
                {
                    categoryName: data.categoryName,
                    nomeclature: data.nomeclature,
                    multiLangValues: data.multiLangCategory,
                    parentId: data.parentId,
                    multiLangIsActive: data.multiLangIsActive,
                    updatedAt: new Date().getTime(),
                },
                {
                    where: {
                        id: data.categoryId,
                    },
                }
            )
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|Productprops'
            )
        }
    }

    async save(
        data: CategoryRaw
    ): Promise<Pick<Required<CategoryRaw>, 'categoryId'>> {
        try {
            const category = await KomposeModels.CategoryModel.create({
                categoryName: data.categoryName,
                nomeclature: data.nomeclature,
                parentId: data.parentId,
                multiLangValues: data.multiLangCategory,
                multiLangIsActive: data.multiLangIsActive,
                createdAt: new Date().getTime(),
            })

            return {
                categoryId: category.id,
            }
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|Productprops'
            )
        }
    }

    async fetchAncestorsById(
        categoryId: string
    ): Promise<KomposeInterfaces.CategoryStructureRawI[]> {
        try {
            const result =
                await this.sequelize.query<KomposeInterfaces.CategoryStructureRawI>(
                    KomposeQueries.nestedCategoryStructureQuery(this.schema),
                    {
                        replacements: {
                            categoryId,
                        },
                        type: QueryTypes.SELECT,
                    }
                )

            if (!result || result.length < 1)
                throw new Error(
                    `No se encontraron ancestros validos para la categoria: ${categoryId}`
                )

            return result
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|Productprops'
            )
        }
    }

    async fetchByParams(
        data: QueryParams
    ): Promise<KomposeInterfaces.CategoryStructureRawI[]> {
        const query = `'${data.value}'` || "''"
        try {
            const categoriesFound =
                await this.sequelize.query<KomposeInterfaces.CategoryStructureRawI>(
                    KomposeQueries.registeredCategoriesQuery(this.schema, query),
                    {
                        type: QueryTypes.SELECT,
                    }
                )
            return categoriesFound
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|Productprops'
            )
        }
    }

    async skuExists(data: Pick<CtgItemDTO, 'sku'>): Promise<boolean> {
        console.log('sku recibido: ', data)
        return false
    }
}

export const itemCategoryRepositoryImpl = new ItemCategoryRepository(
    getDatabaseCrendential()
)
