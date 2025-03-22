import { CreateCategoryController } from '@app/application/controllers/category/create.controller'
import { CreateCategoryUseCase } from '@app/application/usecases/category/create.usecase'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { itemCategoryRepositoryImpl } from '@app/infrastructure/repositories/item-category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new CreateCategoryUseCase(itemCategoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CategoryRaw>()

    return new CreateCategoryController(usecase, presenter)
}

export const createCategoryFactory = factory()
