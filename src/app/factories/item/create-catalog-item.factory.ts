import { CreateCatalogItemController } from '@app/application/controllers/item/create-catalog-item.controller'
import { CreateCatalogItemUseCase } from '@app/application/usecases/item/create-catalog-item.usecase'
import { ctgItemRepositoryImpl } from '@app/infrastructure/repositories/catalog-item.repository'
import { type EmptyResponseModel } from '@core/application/models/app/app.model'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new CreateCatalogItemUseCase(ctgItemRepositoryImpl)

    const presenter = new SuccessRequestPresenter<EmptyResponseModel>()

    return new CreateCatalogItemController(usecase, presenter)
}

export const createCatalogItemFactory = factory()
