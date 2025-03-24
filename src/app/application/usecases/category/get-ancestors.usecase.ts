import {
    NestedCategoryEntity,
    type NestedCategoryRaw,
} from '@app/domain/entities/nested-category.entity'
import { type ItemCategoryRepositoryPort } from '../../ports/repositories/item-category.repository'
import { mapFromRawCategoriesToNode } from '../../services/mappers/shared-mapper'
import { type GetCategoryAncestorsPort } from '../../ports/usecases/category.usecase.port'

export class GetCategoryAncestorsUseCase implements GetCategoryAncestorsPort {
    constructor(private readonly repository: ItemCategoryRepositoryPort) {}

    async run(categoryId: string): Promise<NestedCategoryRaw> {
        const categoryRaw = await this.repository.fetchAncestorsById(categoryId)

        const categoryNested = mapFromRawCategoriesToNode(categoryRaw)

        const ctg = NestedCategoryEntity.new({
            categoryId: '',
            path: categoryNested,
        })

        return ctg.getAllProps()
    }
}
