import { type BrandRepositoryPort } from '@app/application/ports/repositories/brand.repository'
import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type DatabaseCredentialModel } from '@core/application/models/db/database-credential.model'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { getDatabaseCrendential } from '@core/shared/configs/db-credentials'
import {
    KomposeConn,
    type KomposeSchemas,
    KomposeModels,
} from '@devnica/kompostia-models-ts'
import { type Sequelize, Op } from 'sequelize'

class BrandRepository implements BrandRepositoryPort {
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

    async updateById(data: ItemBrandRaw): Promise<void> {
        try {
            await KomposeModels.ItemBrandModel.update(
                {
                    brandName: data.brandName,
                    isActive: data.isActive,
                    updatedAt: new Date().getTime(),
                },
                {
                    where: {
                        id: data.brandId,
                    },
                }
            )
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|UpdateBrandById'
            )
        }
    }

    async fetchByParams(
        data: QueryParams
    ): Promise<KomposeSchemas.ItemBrandSchema[]> {
        try {
            const result = await KomposeModels.ItemBrandModel.findAll({
                where: {
                    [Op.and]: {
                        brandName: {
                            [Op.iLike]: `%${data.value}%`, // Búsqueda case-insensitive
                        },
                        // isActive: true,
                    },
                },
            })

            return result
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|FetchBrandsForProduct'
            )
        }
    }

    async save(
        data: ItemBrandProps
    ): Promise<
        Omit<KomposeSchemas.ItemBrandSchema, 'createdAt' | 'updatedAt'>
    > {
        try {
            const brand = await KomposeModels.ItemBrandModel.create({
                brandName: data.brandName,
                createdAt: new Date().getTime(),
            })

            return {
                id: brand.id,
                brandName: brand.brandName,
                isActive: brand.isActive,
            }
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|SaveProductBrand'
            )
        }
    }
}

export const brandRepositoryImpl = new BrandRepository(getDatabaseCrendential())
