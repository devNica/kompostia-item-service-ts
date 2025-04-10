import {
    CtgItemAggregateRoot,
    type CtgItemRaw,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type CatalogItemRepositoryport } from '../../ports/repositories/catalog-item.repository'
import {
    type CtgItemDTO,
    type GetCtgItemPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import {
    mapFromRawCategoriesToNode,
    mapFromRawLocationToNode,
    mapImageMetadataToURL,
} from '../../services/mappers/shared-mapper'
import { type StorageLocationNodeProps } from '@app/domain/value-objects/storage-location-node.vo'

export class GetCatalogItemUseCase implements GetCtgItemPort {
    constructor(private readonly repository: CatalogItemRepositoryport) {}

    async run(
        data: Pick<CtgItemDTO, 'itemId'>,
        baseURL: string
    ): Promise<CtgItemRaw> {
        const itemFound = await this.repository.fetchById(data.itemId)

        const nestedCategories = mapFromRawCategoriesToNode(
            itemFound.categoryRaw
        )

        let nestedLocations: StorageLocationNodeProps | null = null

        if (itemFound.locationRaw.length > 0) {
            nestedLocations = mapFromRawLocationToNode(itemFound.locationRaw)
        }

        const imgURL = mapImageMetadataToURL(itemFound.imgMetaData, baseURL)

        const po = CtgItemAggregateRoot.create({
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

        return po.getAllProps()
    }
}
