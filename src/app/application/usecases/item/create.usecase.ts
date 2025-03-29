import {
    type CreateCatalogItemtDTO,
    type CreateCtgItemPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type CatalogItemRepositoryport } from '../../ports/repositories/catalog-item.repository'
import {
    CtgItemAggregateRoot,
} from '@app/domain/aggregates/catalog-item.aggregate'
import { type FileModel } from '@core/application/models/files/file.model'
import { ProductImgMappingService } from '@app/domain/mappers/product-img.service'

export class CreateCatalogItemUseCase implements CreateCtgItemPort {
    constructor(private readonly repository: CatalogItemRepositoryport) {}

    async run(data: CreateCatalogItemtDTO, adj: FileModel[]): Promise<void> {
        const images = ProductImgMappingService.fileToProductImg(adj)

        const item = CtgItemAggregateRoot.create({
            ...data,
            mask: 'UUUUUU',
            isActive: true,
            reference: '',
            createdAt: new Date().getTime(),
        })

        const product = item.getAllProps()

        await this.repository.save(product, images)
    }
}
