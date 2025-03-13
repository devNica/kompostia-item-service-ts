import { CreateItemBrandController } from '@app/application/controllers/item-brand/create-item-brand.controller'
import { CreateItemBrandUseCase } from '@app/application/usecases/item-brand/create-item-brand.usecase'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { itemBrandRepositoryImpl } from '@app/infrastructure/repositories/item-brand.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessfullyCreatedResourcePresenter } from '@core/application/presenters/successfully-created-resource.presenter'

function factory(): ControllerPort {
    const usecase = new CreateItemBrandUseCase(itemBrandRepositoryImpl)

    const presenter = new SuccessfullyCreatedResourcePresenter<ItemBrandRaw>()

    return new CreateItemBrandController(usecase, presenter)
}

export const createItemBrandFactory = factory()
