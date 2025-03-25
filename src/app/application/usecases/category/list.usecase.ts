import {
    CategoryEntity,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { type CategoryRepositoryPort } from '../../ports/repositories/category.repository'
import { type ListCategoriesPort } from '../../ports/usecases/category.usecase.port'
import { type QueryParams } from '@core/application/models/app/app.model'

export class ListCategoriesUseCase implements ListCategoriesPort {
    constructor(private readonly repository: CategoryRepositoryPort) {}

    async run(data: QueryParams): Promise<CategoryRaw[]> {
        const categoriesRaw = await this.repository.fetchByParams(data)

        const categories = categoriesRaw.map((ele) =>
            CategoryEntity.create({
                categoryId: ele.id,
                categoryName: ele.categoryName,
                multiLangCategory: ele.multiLangCategory,
                nomeclature: ele.nomeclature,
                parentName: ele.parentName,
                parentId: ele.parentId,
                multiLangIsActive: ele.multiLangIsActive,
            })
        )

        return categories.map((ctg) => ctg.getAllProps())
    }
}
