import {
    LocationLinkedListEntity,
    type LocationLinkedListRaw,
} from '@app/domain/entities/location-linked-list.entity'
import { type GetLocationLinkedListPort } from '../../ports/usecases/location.usecase.port'
import { mapFromRawLocationToNode } from '../../services/mappers/shared-mapper'
import { type StorageLocationRepositoryPort } from '../../ports/repositories/product-location.repository'

export class GetLocationLinkedListUseCase implements GetLocationLinkedListPort {
    constructor(private readonly repository: StorageLocationRepositoryPort) {}

    async run(locationId: string): Promise<LocationLinkedListRaw> {
        const locationRaw =
            await this.repository.fetchLinkedListById(locationId)

        const locationsNested = mapFromRawLocationToNode(locationRaw)

        const loc = LocationLinkedListEntity.new({
            locationId: '',
            address: '',
            path: locationsNested,
        })

        return loc.getAllProps()
    }
}
