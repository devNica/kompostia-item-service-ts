import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { KomposeInterfaces } from '@devnica/kompostia-models-ts'

export interface ItemBrandRepositoryI {
    save: (
        data: ItemBrandProps
    ) => Promise<Omit<KomposeInterfaces.ItemBrandI, 'createdAt' | 'updatedAt'>>
    fetchByParams: (data: QueryParams) => Promise<KomposeInterfaces.ItemBrandI[]>
    updateById: (data: ItemBrandRaw) => Promise<void>
}
