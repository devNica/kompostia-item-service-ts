import { ListBrandsItemsController } from '@app/application/controllers/item-brand/list-brands-items.controller'
import { ListBrandsItemsUseCase } from '@app/application/usecases/item-brand/list-brands-items.usecase'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { itemBrandRepositoryImpl } from '@app/infrastructure/repositories/item-brand.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new ListBrandsItemsUseCase(itemBrandRepositoryImpl)

    const presenter = new SuccessRequestPresenter<ItemBrandRaw[]>()

    return new ListBrandsItemsController(usecase, presenter)
}

export const listBrandsItemsFactory = factory()
