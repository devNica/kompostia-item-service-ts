import { GetCategoriesLinkedListController } from '@app/application/controllers/category/get-linked-list.controller'
import { GetCategoryLinkedListUseCase } from '@app/application/usecases/category/get-linked-list.usecase'
import { type CategoryLinkedListRaw } from '@app/domain/entities/category-linked-list.entity'
import { categoryRepositoryImpl } from '@app/infrastructure/repositories/category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new GetCategoryLinkedListUseCase(categoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CategoryLinkedListRaw>()

    return new GetCategoriesLinkedListController(usecase, presenter)
}

export const getCategoryLinkedListFactory = factory()
