import {
    type CreateCatalogItemtDTO,
    type CreateCtgItemPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type CatalogItemRepositoryport } from '../../ports/repositories/catalog-item.repository'
import {
    CtgItemAggregateRoot,
    type CtgItemRaw,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type FileModel } from '@core/application/models/files/file.model'
import { ProductImgMappingService } from '@app/domain/mappers/product-img.service'
import { type ItemBrandRaw } from '@app/domain/entities/brand.entity'

export class CreateCatalogItemUseCase implements CreateCtgItemPort {
    constructor(private readonly repository: CatalogItemRepositoryport) {}

    async run(data: CreateCatalogItemtDTO, adj: FileModel[]): Promise<void> {
        const images = ProductImgMappingService.fileToProductImg(adj)

        const item = CtgItemAggregateRoot.fromRawData({
            ...data,
            mask: 'UUUUUU',
            isActive: true,
            reference: '',
            createdAt: new Date().getTime(),
        })

        const product = item.toRawData() as Omit<CtgItemRaw, 'brand'> & {
            brand: Required<ItemBrandRaw>
        }

        await this.repository.save(product, images)
    }
}
