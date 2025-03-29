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
    mapFromRawCategoriesToNode,
    mapFromRawLocationToNode,
} from '../../services/mappers/shared-mapper'
import { type StorageLocationNodeProps } from '@app/domain/value-objects/storage-location-node.vo'

export class UpdateCatalogItemBrandUseCase implements UpdateCtgItemBrandPort {
    constructor(private readonly repository: CatalogItemRepositoryport) {}

    async run(data: UpdCtgItemBrandDTO, itemId: string): Promise<CtgItemRaw> {
        
        // Actualizar la marca del articulo
        await this.repository.updateCtgItemBrandById({
            brandId: data.brandId,
            itemId,
        })
        // Consular el Producto para recuperar la informacion actualizada de sus propiedades
        const product = await this.repository.fetchById(itemId)

        const nestedCategories = mapFromRawCategoriesToNode(product.categoryRaw)

        let nestedLocations: StorageLocationNodeProps | null = null

        if (product.locationRaw.length > 0) {
            nestedLocations = mapFromRawLocationToNode(product.locationRaw)
        }

        const po = CtgItemAggregateRoot.create({
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

        return po.getAllProps()
    }
}
