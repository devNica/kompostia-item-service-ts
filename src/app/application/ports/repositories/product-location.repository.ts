import {
    type LocationTypeRaw,
    type StorageLocationRaw,
} from '@app/domain/entities/storage-location.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type KomposeSchemas } from '@devnica/kompostia-models-ts'

export interface StorageLocationRepositoryPort {
    save: (
        data: StorageLocationRaw
    ) => Promise<Pick<Required<StorageLocationRaw>, 'locationId'>>
    fetchByParams: (
        data: QueryParams
    ) => Promise<KomposeSchemas.StorageLocationRawQuerySchema[]>
    fetchAncestorsById: (
        locationId: string
    ) => Promise<KomposeSchemas.StorageLocationRawQuerySchema[]>
    updateById: (
        data: Omit<StorageLocationRaw, 'locationId'> & { locationId: string }
    ) => Promise<void>
    fetchByParentId: (parentId: string) => Promise<LocationTypeRaw>
    fetchLocationTypeyId: (locationTypeId: string) => Promise<LocationTypeRaw>
}
