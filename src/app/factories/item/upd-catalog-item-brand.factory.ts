import { UpdateCatalogItemBrandController } from '@app/application/controllers/item/upd-catalog-item-brand.controller'
import { UpdateCatalogItemBrandUseCase } from '@app/application/usecases/item/upd-catalog-item-brand.usecase'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { ctgItemRepositoryImpl } from '@app/infrastructure/repositories/catalog-item.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new UpdateCatalogItemBrandUseCase(ctgItemRepositoryImpl)

    const presenter = new SuccessRequestPresenter<CtgItemRaw>()

    return new UpdateCatalogItemBrandController(usecase, presenter)
}

export const updateCatalogItemBrandFactory = factory()
