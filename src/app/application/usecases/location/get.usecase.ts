import {
    NestedLocationEntity,
    type NestedLocationRaw,
} from '@app/domain/entities/nested-location.entity'
import { type GetLocationAncestorsPort } from '../../ports/usecases/location.usecase.port'
import { mapLocationTreeToAggregateProps } from '../../services/mappers/product-props.map'
import { type StorageLocationRepositoryPort } from '../../ports/repositories/product-location.repository'

export class GetLocationAncestorsUseCase implements GetLocationAncestorsPort {
    constructor(private readonly repository: StorageLocationRepositoryPort) {}

    async run(locationId: string): Promise<NestedLocationRaw> {
        const locationRaw = await this.repository.fetchAncestorsById(locationId)

        const locationsNested = mapLocationTreeToAggregateProps(locationRaw)

        const loc = NestedLocationEntity.new({
            locationId: '',
            address: '',
            path: locationsNested,
        })

        return loc.getAllProps()
    }
}
