import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type QueryParams } from '@core/application/models/app/app.model'

export interface CreateItemBrandPort {
    run: (data: ItemBrandProps) => Promise<ItemBrandRaw>
}

export interface ListBrandsItemsPort {
    run: (data: QueryParams) => Promise<ItemBrandRaw[]>
}

export interface UpdateBrandInformationPort {
    run: (data: ItemBrandProps, brandId: string) => Promise<ItemBrandRaw>
}
