import { NestedCategoryEntity } from '@app/domain/entities/nested-category.entity'
import {
    type CtgItemDTO,
    type UpdateCtgItemCategoryPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type CatalogItemRepositoryport } from '../../ports/repositories/catalog-item.repository'
import {
    mapCategoryTreeToAggregateProps,
    mapLocationTreeToAggregateProps,
} from '../../services/mappers/product-props.map'
import {
    CtgItemAggregateRoot,
    type CtgItemRaw,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type LocationNodeProps } from '@app/domain/value-objects/child-node-location.vo'

export class UpdateCatalogItemCategoryUseCase
    implements UpdateCtgItemCategoryPort
{
    constructor(private readonly repository: CatalogItemRepositoryport) {}

    async run(
        data: Pick<CtgItemDTO, 'category'> & { itemId: string }
    ): Promise<CtgItemRaw> {
        const ctg = NestedCategoryEntity.new(data.category)

        const category = ctg.getAllProps()

        await this.repository.updateCtgItemCategoryById({
            categoryId: category.categoryId,
            itemId: data.itemId,
        })

        const product = await this.repository.fetchById(data.itemId)

        const categoryNested = mapCategoryTreeToAggregateProps(
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
                path: categoryNested,
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
