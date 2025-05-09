import { type CategoryRepositoryPort } from '@app/application/ports/repositories/category.repository'
import { type CtgItemDTO } from '@app/application/ports/usecases/catalog-item.usecase.port'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type DatabaseCredentialModel } from '@core/application/models/db/database-credential.model'
import { ConflictErrorPresenter } from '@core/application/presenters/conflict-error-presenter'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { getDatabaseCrendential } from '@core/shared/configs/db-credentials'
import {
    KomposeConn,
    type KomposeSchemas,
    KomposeModels,
    KomposeQueries,
} from '@devnica/kompostia-models-ts'
import { ForeignKeyConstraintError, QueryTypes, UniqueConstraintError, ValidationError, type Sequelize } from 'sequelize'

class CategoryRepository implements CategoryRepositoryPort {
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
            if (
                error instanceof ForeignKeyConstraintError ||
                error instanceof ValidationError
            ) {
                throw new ConflictErrorPresenter(String(error))
            } else {
                throw new RepositoryErrorPresenter(
                    'Actualizacion de Registro fallido',
                    'Repositorio|Category'
                )
            }
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
            if (
                error instanceof UniqueConstraintError ||
                error instanceof ForeignKeyConstraintError ||
                error instanceof ValidationError
            ) {
                throw new ConflictErrorPresenter(String(error))
            } else {
                throw new RepositoryErrorPresenter(
                    'Creacion de Registro fallido',
                    'Repositorio|Category'
                )
            }
        }
    }

    async fetchLinkedListById(
        categoryId: string
    ): Promise<KomposeSchemas.CategoryRawQuerySchema[]> {
        try {
            const result =
                await this.sequelize.query<KomposeSchemas.CategoryRawQuerySchema>(
                    KomposeQueries.linkedListRegisteredCategoriesSQL(
                        this.schema
                    ),
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
    ): Promise<KomposeSchemas.CategoryRawQuerySchema[]> {
        const query = `'${data.value}'` || "''"
        try {
            const categoriesFound =
                await this.sequelize.query<KomposeSchemas.CategoryRawQuerySchema>(
                    KomposeQueries.registeredCategoriesSQL(this.schema, query),
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

export const categoryRepositoryImpl = new CategoryRepository(
    getDatabaseCrendential()
)
