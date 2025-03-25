import { CategoryLinkedListEntity } from '@app/domain/entities/category-linked-list.entity'
import {
    type CtgItemDTO,
    type UpdateCtgItemCategoryPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type CatalogItemRepositoryport } from '../../ports/repositories/catalog-item.repository'
import {
    mapFromRawCategoriesToNode,
    mapFromRawLocationToNode,
} from '../../services/mappers/shared-mapper'
import {
    CtgItemAggregateRoot,
    type CtgItemRaw,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type StorageLocationNodeProps } from '@app/domain/value-objects/storage-location-node.vo'

export class UpdateCatalogItemCategoryUseCase
    implements UpdateCtgItemCategoryPort
{
    constructor(private readonly repository: CatalogItemRepositoryport) {}

    async run(
        data: Pick<CtgItemDTO, 'category'>,
        itemId: string
    ): Promise<CtgItemRaw> {
        const ctg = CategoryLinkedListEntity.new(data.category)

        const category = ctg.getAllProps()

        await this.repository.updateCtgItemCategoryById({
            categoryId: category.categoryId,
            itemId,
        })

        const product = await this.repository.fetchById(itemId)

        const categoryNested = mapFromRawCategoriesToNode(product.categoryRaw)

        let nestedLocations: StorageLocationNodeProps | null = null

        if (product.locationRaw.length > 0) {
            nestedLocations = mapFromRawLocationToNode(product.locationRaw)
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
