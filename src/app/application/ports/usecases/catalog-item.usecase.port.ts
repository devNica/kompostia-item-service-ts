import { type SupplierProps } from '@app/domain/entities/supplier.entity'
import { type NestedLocationRaw } from '@app/domain/entities/nested-location.entity'
import { type FileModel } from '@core/application/models/files/file.model'
import { type NestedCategoryRaw } from '@app/domain/entities/nested-category.entity'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export interface CtgItemDTO {
    itemId: string
    itemName: string
    description: string
    sku: string
    supplier: SupplierProps
    supplierProductName: string
    supplierProductCode: string
    brand: ItemBrandRaw
    category: NestedCategoryRaw
    location?: NestedLocationRaw
    reference: string
    createdAt: number
    isActive: boolean
}

export interface UpdCtgItemBrandDTO {
    brand: Required<Omit<ItemBrandRaw, 'isActive'>>
    itemId: string
}

export interface CtgItemImageDTO {
    binary: Buffer
    filesize: number
    filetype: string
}

export type CreateCatalogItemtDTO = Omit<
    CtgItemDTO,
    'itemId' | 'createdAt' | 'isActive'
>

export interface CreateCtgItemPort {
    run: (data: CreateCatalogItemtDTO, adj: FileModel[]) => Promise<void>
}

export interface GetCtgItemPort {
    run: (
        data: Pick<CtgItemDTO, 'itemId'>,
        baseURL: string
    ) => Promise<CtgItemRaw>
}

export interface UpdateCtgItemBrandPort {
    run: (data: UpdCtgItemBrandDTO) => Promise<CtgItemRaw>
}

export interface VerifyProductSKUI {
    run: (data: Pick<CtgItemDTO, 'sku'>) => Promise<{ available: boolean }>
}

export interface DownloadCtgImageI {
    run: (data: { fileId: string }) => Promise<CtgItemImageDTO>
}

export interface UpdateCtgItemCategoryPort {
    run: (
        data: Pick<CtgItemDTO, 'category'> & { itemId: string }
    ) => Promise<CtgItemRaw>
}
