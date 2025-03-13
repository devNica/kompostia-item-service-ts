import { GetCategoriesAncestorsController } from '@app/application/controllers/category/get-category-ancestors.controller'
import { GetCategoryAncestorsUseCase } from '@app/application/usecases/category/get-category-ancestors.usecase'
import { type NestedCategoryRaw } from '@app/domain/entities/nested-category.entity'
import { itemCategoryRepositoryImpl } from '@app/infrastructure/repositories/item-category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new GetCategoryAncestorsUseCase(itemCategoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<NestedCategoryRaw>()

    return new GetCategoriesAncestorsController(usecase, presenter)
}

export const getCategoryAncestorsFactory = factory()
