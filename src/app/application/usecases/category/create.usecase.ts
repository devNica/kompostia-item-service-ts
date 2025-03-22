import { type ItemCategoryRepositoryPort } from '@app/application/ports/repositories/item-category.repository'
import { type CreateCategoryPort } from '@app/application/ports/usecases/category.usecase.port'
import {
    CategoryEntity,
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'

export class CreateCategoryUseCase implements CreateCategoryPort {
    constructor(private readonly repository: ItemCategoryRepositoryPort) {}

    async run(data: CategoryProps): Promise<CategoryRaw> {
        const ctg = CategoryEntity.create(data)

        const category = await this.repository.save(ctg.getAllProps())

        ctg.setPersistentId(category.categoryId)

        return ctg.getAllProps()
    }
}
