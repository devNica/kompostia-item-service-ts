import { type ProductImgRaw } from '@app/domain/entities/product-img.entity'

export interface ProductFileRepositoryPort {
    getImageById: (fileId: string) => Promise<ProductImgRaw>
}
