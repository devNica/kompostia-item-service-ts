import {
    NestedLocationEntity,
    type NestedLocationRaw,
} from '@app/domain/entities/nested-location.entity'
import { type GetLocationAncestorsI } from '../../ports/usecases/location.usecase.port'
import { mapLocationTreeToAggregateProps } from '../../services/mappers/product-props.map'
import { type StorageLocationRepositoryI } from '../../ports/repositories/product-location.repository'

export class GetLocationAncestorsUseCase implements GetLocationAncestorsI {
    constructor(private readonly repository: StorageLocationRepositoryI) {}

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
