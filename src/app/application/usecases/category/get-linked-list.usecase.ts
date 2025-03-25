import {
    CategoryLinkedListEntity,
    type CategoryLinkedListRaw,
} from '@app/domain/entities/category-linked-list.entity'
import { type CategoryRepositoryPort } from '../../ports/repositories/category.repository'
import { mapFromRawCategoriesToNode } from '../../services/mappers/shared-mapper'
import { type GetCategoryLinkedListPort } from '../../ports/usecases/category.usecase.port'

export class GetCategoryLinkedListUseCase implements GetCategoryLinkedListPort {
    constructor(private readonly repository: CategoryRepositoryPort) {}

    async run(categoryId: string): Promise<CategoryLinkedListRaw> {
        const categoryRaw =
            await this.repository.fetchLinkedListById(categoryId)

        const categoryNested = mapFromRawCategoriesToNode(categoryRaw)

        const ctg = CategoryLinkedListEntity.new({
            categoryId: '',
            path: categoryNested,
        })

        return ctg.getAllProps()
    }
}
