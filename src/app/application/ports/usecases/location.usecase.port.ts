import { type NestedLocationRaw } from '@app/domain/entities/nested-location.entity'
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

export interface GetLocationAncestorsPort {
    run: (locationId: string) => Promise<NestedLocationRaw>
}

export interface UpdateStorageLocationPort {
    run: (
        data: UpdateStorageLocationDTO,
        locationId: string
    ) => Promise<StorageLocationRaw>
}
