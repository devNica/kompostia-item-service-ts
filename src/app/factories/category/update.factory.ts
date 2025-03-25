import { UpdateCategoryController } from '@app/application/controllers/category/update.controller'
import { UpdateCategoryUseCase } from '@app/application/usecases/category/update.usecase'
import {
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { itemCategoryRepositoryImpl } from '@app/infrastructure/repositories/item-category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort<
    CategoryRaw,
    {
        body: CategoryProps
        params: { categoryId: string }
    }
> {
    const usecase = new UpdateCategoryUseCase(itemCategoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CategoryRaw>()

    return new UpdateCategoryController(usecase, presenter)
}

export const updateCategoryFactory = factory()
