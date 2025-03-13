import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type QueryParams } from '@core/application/models/app/app.model'

export interface CreateItemBrandI {
    run: (data: ItemBrandProps) => Promise<ItemBrandRaw>
}

export interface ListBrandsItemsI {
    run: (data: QueryParams) => Promise<ItemBrandRaw[]>
}

export interface UpdateBrandInformationI {
    run: (data: ItemBrandProps, brandId: string) => Promise<ItemBrandRaw>
}
