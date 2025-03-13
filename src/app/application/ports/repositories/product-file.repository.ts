import { type ProductImgRaw } from '@app/domain/entities/product-img.entity'

export interface ProductFileRepositoryI {
    getImageById: (fileId: string) => Promise<ProductImgRaw>
}
