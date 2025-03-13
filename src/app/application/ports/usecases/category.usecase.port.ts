import {
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { type NestedCategoryRaw } from '@app/domain/entities/nested-category.entity'
import { type QueryParams } from '@core/application/models/app/app.model'

export interface CreateCategoryI {
    run: (data: CategoryProps) => Promise<CategoryRaw>
}

export interface UpdateCategoryI {
    run: (data: CategoryProps, categoryId: string) => Promise<CategoryRaw>
}

export interface ListCategoriesI {
    run: (data: QueryParams) => Promise<CategoryRaw[]>
}

export interface GetCategoryAncestorsI {
    run: (categoryId: string) => Promise<NestedCategoryRaw>
}
