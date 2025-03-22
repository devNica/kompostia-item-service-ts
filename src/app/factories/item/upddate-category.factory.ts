import { UpdateCatalogItemCategoryController } from '@app/application/controllers/item/update-category.controller'
import { UpdateCatalogItemCategoryUseCase } from '@app/application/usecases/item/update-category.usecase'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { ctgItemRepositoryImpl } from '@app/infrastructure/repositories/catalog-item.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new UpdateCatalogItemCategoryUseCase(ctgItemRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CtgItemRaw>()

    return new UpdateCatalogItemCategoryController(usecase, presenter)
}

export const updateCatalogItemCategoryFactory = factory()
