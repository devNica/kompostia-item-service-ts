import {
    type CreateCatalogItemtDTO,
    type CreateCtgItemI,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type CatalogItemRepositoryI } from '../../ports/repositories/catalog-item.repository'
import {
    CtgItemAggregateRoot,
    type CtgItemRaw,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type FileModel } from '@core/application/models/files/file.model'
import { ProductImgMappingService } from '@app/domain/mappers/product-img.service'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'

export class CreateCatalogItemUseCase implements CreateCtgItemI {
    constructor(private readonly repository: CatalogItemRepositoryI) {}

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
