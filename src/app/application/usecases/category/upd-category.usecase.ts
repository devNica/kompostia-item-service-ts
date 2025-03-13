import {
    CategoryEntity,
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { type UpdateCategoryI } from '../../ports/usecases/category.usecase.port'
import { type ItemCategoryRepositoryI } from '../../ports/repositories/item-category.repository'

export class UpdateCategoryUseCase implements UpdateCategoryI {
    constructor(private readonly repository: ItemCategoryRepositoryI) {}

    async run(data: CategoryProps, categoryId: string): Promise<CategoryRaw> {
        const ctg = CategoryEntity.create({
            categoryId,
            ...data,
        })

        await this.repository.updateById({
            categoryId,
            ...ctg.getAllProps(),
        })

        return ctg.getAllProps()
    }
}
