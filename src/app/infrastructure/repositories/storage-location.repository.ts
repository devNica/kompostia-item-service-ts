import { type StorageLocationRepositoryPort } from '@app/application/ports/repositories/product-location.repository'
import {
    type LocationTypeRaw,
    type StorageLocationRaw,
} from '@app/domain/entities/storage-location.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type DatabaseCredentialModel } from '@core/application/models/db/database-credential.model'
import { ConflictErrorPresenter } from '@core/application/presenters/conflict-error-presenter'
import { RepositoryErrorPresenter } from '@core/application/presenters/repository-error.presenter'
import { getDatabaseCrendential } from '@core/shared/configs/db-credentials'
import { KomposeConn, KomposeInterfaces, KomposeModels, KomposeQueries } from '@devnica/kompostia-models-ts'

import { DatabaseError, QueryTypes, type Sequelize } from 'sequelize'

class StorageLocationRepository implements StorageLocationRepositoryPort {
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

    async fetchByParams(
        data: QueryParams
    ): Promise<KomposeInterfaces.StorageLocationStructureRawI[]> {
        const query = `'${data.value}'` || "''"
        try {
            const locationsFound =
                await this.sequelize.query<KomposeInterfaces.StorageLocationStructureRawI>(
                    KomposeQueries.registeredLocationsQuery(this.schema, query),
                    {
                        type: QueryTypes.SELECT,
                    }
                )
            return locationsFound
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|FetchLocations'
            )
        }
    }

    async fetchByParentId(parentId: string): Promise<LocationTypeRaw> {
        try {
            const result = await KomposeModels.StorageLocationModel.findByPk(
                parentId,
                {
                    include: {
                        model: KomposeModels.LocationTypeModel,
                        attributes: ['id', 'name', 'rules'],
                        as: 'locationType',
                    },
                }
            )

            if (!result?.locationType) {
                throw new Error('Tipo de Ubicacion no encontrado')
            }

            return {
                locationTypeId: result.locationType?.id,
                name: result.locationType?.name,
                rules: result.locationType?.rules,
            }
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new ConflictErrorPresenter(error.message)
            }
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|FetchLocationTypeByParentId'
            )
        }
    }

    async fetchById(locationTypeId: string): Promise<LocationTypeRaw> {
        try {
            const result =
                await KomposeModels.LocationTypeModel.findByPk(locationTypeId)

            if (!result) {
                throw new Error('Tipo de Ubicacion no encontrado')
            }

            return {
                locationTypeId: result.id,
                name: result.name,
                rules: result.rules,
            }
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new ConflictErrorPresenter(error.message)
            }
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|FetchLocationTypeById'
            )
        }
    }

    async updateById(
        data: Omit<StorageLocationRaw, 'locationId'> & { locationId: string }
    ): Promise<void> {
        try {
            await KomposeModels.StorageLocationModel.update(
                {
                    locationName: data.locationName,
                    nomeclature: data.nomeclature,
                    parentId: data.parentId,
                    hasAccounting: data.hasAccounting,
                    locationTypeId: data.locationTypeId,
                    isActive: data.isActive,
                    updatedAt: new Date().getTime(),
                },
                {
                    where: {
                        id: data.locationId,
                    },
                }
            )
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|UpdateLocationById'
            )
        }
    }

    async fetchAncestorsById(
        locationId: string
    ): Promise<KomposeInterfaces.StorageLocationStructureRawI[]> {
        try {
            const result =
                await this.sequelize.query<KomposeInterfaces.StorageLocationStructureRawI>(
                    KomposeQueries.nestedLocationStructureQuery(this.schema),
                    {
                        replacements: {
                            locationId,
                        },
                        type: QueryTypes.SELECT,
                    }
                )

            if (!result)
                throw new Error(
                    `No se encontraron ancestros validos para la categoria: ${locationId}`
                )

            return result
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|FetchLocationAncestors'
            )
        }
    }

    async save(
        data: StorageLocationRaw
    ): Promise<Pick<Required<StorageLocationRaw>, 'locationId'>> {
        try {
            const location = await KomposeModels.StorageLocationModel.create({
                locationName: data.locationName,
                nomeclature: data.nomeclature,
                parentId: data.parentId,
                hasAccounting: data.hasAccounting,
                createdAt: new Date().getTime(),
                locationTypeId: data.locationTypeId,
            })

            return {
                locationId: location.id,
            }
        } catch (error) {
            throw new RepositoryErrorPresenter(
                String(error),
                'Repositorio|InsertLocation'
            )
        }
    }
}

export const storageLocationRepositoryImpl = new StorageLocationRepository(
    getDatabaseCrendential()
)
