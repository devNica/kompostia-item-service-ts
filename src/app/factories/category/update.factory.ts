import { UpdateCategoryController } from '@app/application/controllers/category/update.controller'
import { UpdateCategoryUseCase } from '@app/application/usecases/category/update.usecase'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { categoryRepositoryImpl } from '@app/infrastructure/repositories/category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new UpdateCategoryUseCase(categoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CategoryRaw>()

    return new UpdateCategoryController(usecase, presenter)
}

export const updateCategoryFactory = factory()
