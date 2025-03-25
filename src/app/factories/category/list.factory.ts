import { ListCategoriesController } from '@app/application/controllers/category/list.controller'
import { ListCategoriesUseCase } from '@app/application/usecases/category/list.usecase'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { categoryRepositoryImpl } from '@app/infrastructure/repositories/category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new ListCategoriesUseCase(categoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CategoryRaw[]>()

    return new ListCategoriesController(usecase, presenter)
}

export const listCategoriesFactory = factory()
