import {
    CtgItemAggregateRoot,
    type CtgItemRaw,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type CatalogItemRepositoryport } from '../../ports/repositories/catalog-item.repository'
import {
    type UpdateCtgItemBrandPort,
    type UpdCtgItemBrandDTO,
} from '../../ports/usecases/catalog-item.usecase.port'
import {
    mapCategoryTreeToAggregateProps,
    mapLocationTreeToAggregateProps,
} from '../../services/mappers/shared-mapper'
import { type LocationNodeProps } from '@app/domain/value-objects/child-node-location.vo'

export class UpdateCatalogItemBrandUseCase implements UpdateCtgItemBrandPort {
    constructor(private readonly repository: CatalogItemRepositoryport) {}

    async run(data: UpdCtgItemBrandDTO, itemId: string): Promise<CtgItemRaw> {
        await this.repository.updateCtgItemBrandById({
            brandId: data.brandId,
            itemId,
        })

        const product = await this.repository.fetchById(itemId)

        const nestedCategories = mapCategoryTreeToAggregateProps(
            product.categoryRaw
        )

        let nestedLocations: LocationNodeProps | null = null

        if (product.locationRaw.length > 0) {
            nestedLocations = mapLocationTreeToAggregateProps(
                product.locationRaw
            )
        }

        const po = CtgItemAggregateRoot.fromRawData({
            ...product,
            category: {
                categoryId: '',
                path: nestedCategories,
            },
            location: {
                address: '',
                locationId: '',
                path: nestedLocations,
            },
            mask: 'UUUUUU',
        })

        return po.toResponse()
    }
}
