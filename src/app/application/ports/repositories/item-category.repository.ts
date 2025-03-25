import { type QueryParams } from '@core/application/models/app/app.model'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { type KomposeSchemas } from '@devnica/kompostia-models-ts'
import { type CtgItemDTO } from '../usecases/catalog-item.usecase.port'

export interface ItemCategoryRepositoryPort {
    skuExists: (data: Pick<CtgItemDTO, 'sku'>) => Promise<boolean>
    fetchByParams: (
        data: QueryParams
    ) => Promise<KomposeSchemas.CategoryRawQuerySchema[]>
    fetchAncestorsById: (
        categoryId: string
    ) => Promise<KomposeSchemas.CategoryRawQuerySchema[]>
    save: (
        data: CategoryRaw
    ) => Promise<Pick<Required<CategoryRaw>, 'categoryId'>>
    updateById: (
        data: Omit<CategoryRaw, 'categoryId'> & { categoryId: string }
    ) => Promise<void>
}
