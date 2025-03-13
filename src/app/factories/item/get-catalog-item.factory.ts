import { GetCatalogItemController } from '@app/application/controllers/item/get-catalog-item.controller'
import { GetCatalogItemUseCase } from '@app/application/usecases/item/get-catalog-item.usecase'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { ctgItemRepositoryImpl } from '@app/infrastructure/repositories/catalog-item.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new GetCatalogItemUseCase(ctgItemRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CtgItemRaw>()

    return new GetCatalogItemController(usecase, presenter)
}

export const getCatalogItemFactory = factory()
