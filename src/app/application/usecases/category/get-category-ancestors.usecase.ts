import {
    NestedCategoryEntity,
    type NestedCategoryRaw,
} from '@app/domain/entities/nested-category.entity'
import { type ItemCategoryRepositoryI } from '../../ports/repositories/item-category.repository'
import { mapCategoryTreeToAggregateProps } from '../../services/mappers/product-props.map'
import { type GetCategoryAncestorsI } from '../../ports/usecases/category.usecase.port'

export class GetCategoryAncestorsUseCase implements GetCategoryAncestorsI {
    constructor(private readonly repository: ItemCategoryRepositoryI) {}

    async run(categoryId: string): Promise<NestedCategoryRaw> {
        const categoryRaw = await this.repository.fetchAncestorsById(categoryId)

        const categoryNested = mapCategoryTreeToAggregateProps(categoryRaw)

        const ctg = NestedCategoryEntity.new({
            categoryId: '',
            path: categoryNested,
        })

        return ctg.getAllProps()
    }
}
