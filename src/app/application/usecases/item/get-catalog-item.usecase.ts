import {
    CtgItemAggregateRoot,
    type CtgItemRaw,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type CatalogItemRepositoryI } from '../../ports/repositories/catalog-item.repository'
import {
    type CtgItemDTO,
    type GetCtgItemI,
} from '../../ports/usecases/catalog-item.usecase.port'
import {
    mapCategoryTreeToAggregateProps,
    mapImageMetadataToURL,
    mapLocationTreeToAggregateProps,
} from '../../services/mappers/product-props.map'
import { type LocationNodeProps } from '@app/domain/value-objects/child-node-location.vo'

export class GetCatalogItemUseCase implements GetCtgItemI {
    constructor(private readonly repository: CatalogItemRepositoryI) {}

    async run(
        data: Pick<CtgItemDTO, 'itemId'>,
        baseURL: string
    ): Promise<CtgItemRaw> {
        const itemFound = await this.repository.fetchById(data.itemId)

        const nestedCategories = mapCategoryTreeToAggregateProps(
            itemFound.categoryRaw
        )

        let nestedLocations: LocationNodeProps | null = null

        if (itemFound.locationRaw.length > 0) {
            nestedLocations = mapLocationTreeToAggregateProps(
                itemFound.locationRaw
            )
        }

        const imgURL = mapImageMetadataToURL(itemFound.imgMetaData, baseURL)

        const po = CtgItemAggregateRoot.fromRawData({
            ...itemFound,
            category: {
                categoryId: '',
                path: nestedCategories,
            },
            location: {
                address: '',
                locationId: '',
                path: nestedLocations,
            },
            urls: imgURL,
            mask: 'UUUUUU',
        })

        return po.toResponse()
    }
}
