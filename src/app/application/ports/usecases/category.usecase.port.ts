import {
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { type NestedCategoryRaw } from '@app/domain/entities/nested-category.entity'
import { type QueryParams } from '@core/application/models/app/app.model'

export interface CreateCategoryPort {
    run: (data: CategoryProps) => Promise<CategoryRaw>
}

export interface UpdateCategoryPort {
    run: (data: CategoryProps, categoryId: string) => Promise<CategoryRaw>
}

export interface ListCategoriesPort {
    run: (data: QueryParams) => Promise<CategoryRaw[]>
}

export interface GetCategoryAncestorsPort {
    run: (categoryId: string) => Promise<NestedCategoryRaw>
}
