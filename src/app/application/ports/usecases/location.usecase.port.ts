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

export interface CreateStorageLocationI {
    run: (data: CreateStorageLocationDTO) => Promise<StorageLocationRaw>
}

export interface ListStorageLocationsI {
    run: (data: QueryParams) => Promise<StorageLocationRaw[]>
}

export interface GetLocationAncestorsI {
    run: (locationId: string) => Promise<NestedLocationRaw>
}

export interface UpdateStorageLocationI {
    run: (
        data: UpdateStorageLocationDTO,
        locationId: string
    ) => Promise<StorageLocationRaw>
}
