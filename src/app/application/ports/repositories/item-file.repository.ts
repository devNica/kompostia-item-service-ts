import { type ProductImgRaw } from '@app/domain/entities/product-img.entity'

export interface ItemFileRepositoryPort {
    getImageById: (fileId: string) => Promise<ProductImgRaw>
}
