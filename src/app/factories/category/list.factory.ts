import { ListCategoriesController } from '@app/application/controllers/category/list.controller'
import { ListCategoriesUseCase } from '@app/application/usecases/category/list.usecase'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { itemCategoryRepositoryImpl } from '@app/infrastructure/repositories/item-category.repository'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort<CategoryRaw[], { query: QueryParams }> {
    const usecase = new ListCategoriesUseCase(itemCategoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CategoryRaw[]>()

    return new ListCategoriesController(usecase, presenter)
}

export const listCategoriesFactory = factory()
