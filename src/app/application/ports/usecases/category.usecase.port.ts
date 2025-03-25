import {
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { type CategoryLinkedListRaw } from '@app/domain/entities/category-linked-list.entity'
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

export interface GetCategoryLinkedListPort {
    run: (categoryId: string) => Promise<CategoryLinkedListRaw>
}
