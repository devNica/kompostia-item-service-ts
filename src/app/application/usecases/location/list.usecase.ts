import {
    StorageLocationEntity,
    type StorageLocationRaw,
} from '@app/domain/entities/storage-location.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type ListStorageLocationsPort } from '../../ports/usecases/location.usecase.port'
import { type StorageLocationRepositoryPort } from '../../ports/repositories/storage-location.repository'

export class ListStorageLocationsUseCase implements ListStorageLocationsPort {
    constructor(private readonly repository: StorageLocationRepositoryPort) {}

    async run(data: QueryParams): Promise<StorageLocationRaw[]> {
        const locationRaw = await this.repository.fetchByParams(data)

        const locations = locationRaw.map((ele) =>
            StorageLocationEntity.set({
                locationId: ele.id,
                locationName: ele.locationName,
                nomeclature: ele.nomeclature,
                parentName: ele.parentName,
                parentId: ele.parentId,
                locationTypeId: ele.locationTypeId,
                type: ele.locationType,
                hasAccounting: ele.hasAccounting,
                isActive: ele.isActive,
            })
        )

        return locations.map((lct) => lct.getAllProps())
    }
}
