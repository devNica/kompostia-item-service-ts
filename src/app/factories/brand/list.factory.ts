import { ListBrandsItemsController } from '@app/application/controllers/brand/list.controller'
import { ListBrandsItemsUseCase } from '@app/application/usecases/brand/list.usecase'
import { type ItemBrandRaw } from '@app/domain/entities/brand.entity'
import { brandRepositoryImpl } from '@app/infrastructure/repositories/brand.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new ListBrandsItemsUseCase(brandRepositoryImpl)

    const presenter = new SuccessRequestPresenter<ItemBrandRaw[]>()

    return new ListBrandsItemsController(usecase, presenter)
}

export const listBrandsItemsFactory = factory()
