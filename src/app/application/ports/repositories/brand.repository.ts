import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type KomposeSchemas } from '@devnica/kompostia-models-ts'

export interface BrandRepositoryPort {
    save: (
        data: ItemBrandProps
    ) => Promise<
        Omit<KomposeSchemas.ItemBrandSchema, 'createdAt' | 'updatedAt'>
    >
    fetchByParams: (
        data: QueryParams
    ) => Promise<KomposeSchemas.ItemBrandSchema[]>
    updateById: (data: ItemBrandRaw) => Promise<void>
}
