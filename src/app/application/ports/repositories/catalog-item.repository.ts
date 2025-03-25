import { type ProductImgRaw } from '@app/domain/entities/product-img.entity'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { type ItemBrandRaw } from '@app/domain/entities/brand.entity'
import { type KomposeSchemas } from '@devnica/kompostia-models-ts'

export type CtgItemFoundI = Omit<
    CtgItemRaw,
    'category' | 'location' | 'urls' | 'mask'
> & {
    id: string
    categoryRaw: KomposeSchemas.CategoryRawQuerySchema[]
    locationRaw: KomposeSchemas.StorageLocationRawQuerySchema[]
    imgMetaData: ImageMetaDataI[] | undefined
}

export interface ImageMetaDataI {
    id: string
    filetype: string
    filesize: number
}

export interface CatalogItemRepositoryport {
    save: (
        product: Omit<CtgItemRaw, 'brand'> & {
            brand: Required<ItemBrandRaw>
        },
        images?: ProductImgRaw[]
    ) => Promise<{ productId: string }>

    fetchById: (productId: string) => Promise<CtgItemFoundI>

    updateCtgItemBrandById: (
        data: Pick<CtgItemRaw, 'itemId'> & { brandId: string }
    ) => Promise<void>

    updateCtgItemCategoryById: (
        data: Pick<CtgItemRaw, 'itemId'> & { categoryId: string }
    ) => Promise<void>
}
