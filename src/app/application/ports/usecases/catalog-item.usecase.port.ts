import { type SupplierProps } from '@app/domain/entities/supplier.entity'
import { type LocationLinkedListRaw } from '@app/domain/entities/location-linked-list.entity'
import { type FileModel } from '@core/application/models/files/file.model'
import { type CategoryLinkedListRaw } from '@app/domain/entities/category-linked-list.entity'
import { type ItemBrandRaw } from '@app/domain/entities/brand.entity'
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
    category: CategoryLinkedListRaw
    location?: LocationLinkedListRaw
    reference: string
    createdAt: number
    isActive: boolean
}

export type UpdCtgItemBrandDTO = Required<Omit<ItemBrandRaw, 'isActive'>>

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
    run: (data: UpdCtgItemBrandDTO, itemId: string) => Promise<CtgItemRaw>
}

export interface UpdateCtgItemCategoryPort {
    run: (
        data: Pick<CtgItemDTO, 'category'>,
        itemId: string
    ) => Promise<CtgItemRaw>
}

export interface VerifyProductSKUI {
    run: (data: Pick<CtgItemDTO, 'sku'>) => Promise<{ available: boolean }>
}

export interface DownloadCtgImageI {
    run: (data: { fileId: string }) => Promise<CtgItemImageDTO>
}
