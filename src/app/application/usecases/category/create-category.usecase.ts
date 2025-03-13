import { type ItemCategoryRepositoryI } from '@app/application/ports/repositories/item-category.repository'
import { type CreateCategoryI } from '@app/application/ports/usecases/category.usecase.port'
import {
    CategoryEntity,
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'

export class CreateCategoryUseCase implements CreateCategoryI {
    constructor(private readonly repository: ItemCategoryRepositoryI) {}

    async run(data: CategoryProps): Promise<CategoryRaw> {
        const ctg = CategoryEntity.create(data)

        const category = await this.repository.save(ctg.getAllProps())

        ctg.setPersistentId(category.categoryId)

        return ctg.getAllProps()
    }
}
