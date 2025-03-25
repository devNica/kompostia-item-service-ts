import {
    CategoryEntity,
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { type UpdateCategoryPort } from '../../ports/usecases/category.usecase.port'
import { type CategoryRepositoryPort } from '../../ports/repositories/category.repository'

export class UpdateCategoryUseCase implements UpdateCategoryPort {
    constructor(private readonly repository: CategoryRepositoryPort) {}

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
