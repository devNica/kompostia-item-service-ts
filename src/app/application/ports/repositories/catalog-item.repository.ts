import { type ProductImgRaw } from '@app/domain/entities/product-img.entity'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { type KomposeInterfaces } from '@devnica/kompostia-models-ts'

export type CtgItemFoundI = Omit<
    CtgItemRaw,
    'category' | 'location' | 'urls' | 'mask'
> & {
    id: string
    categoryRaw: KomposeInterfaces.CategoryStructureRawI[]
    locationRaw: KomposeInterfaces.StorageLocationStructureRawI[]
    imgMetaData: ImageMetaDataI[] | undefined
}

export interface ImageMetaDataI {
    id: string
    filetype: string
    filesize: number
}

export interface CatalogItemRepositoryI {
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
