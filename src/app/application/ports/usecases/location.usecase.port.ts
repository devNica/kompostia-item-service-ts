import { type LocationLinkedListRaw } from '@app/domain/entities/location-linked-list.entity'
import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'

import { type QueryParams } from '@core/application/models/app/app.model'

export type UpdateStorageLocationDTO = Omit<
    StorageLocationRaw,
    'locationId' | 'type'
>
export type CreateStorageLocationDTO = Omit<
    StorageLocationRaw,
    'locationId' | 'type'
>

export interface CreateStorageLocationPort {
    run: (data: CreateStorageLocationDTO) => Promise<StorageLocationRaw>
}

export interface ListStorageLocationsPort {
    run: (data: QueryParams) => Promise<StorageLocationRaw[]>
}

export interface GetLocationLinkedListPort {
    run: (locationId: string) => Promise<LocationLinkedListRaw>
}

export interface UpdateStorageLocationPort {
    run: (
        data: UpdateStorageLocationDTO,
        locationId: string
    ) => Promise<StorageLocationRaw>
}
