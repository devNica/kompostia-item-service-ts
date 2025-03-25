import { CreateItemBrandController } from '@app/application/controllers/brand/create.controller'
import { CreateItemBrandUseCase } from '@app/application/usecases/brand/create.usecase'
import { type ItemBrandRaw } from '@app/domain/entities/brand.entity'
import { brandRepositoryImpl } from '@app/infrastructure/repositories/brand.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessfullyCreatedResourcePresenter } from '@core/application/presenters/successfully-created-resource.presenter'

function factory(): ControllerPort {
    const usecase = new CreateItemBrandUseCase(brandRepositoryImpl)

    const presenter = new SuccessfullyCreatedResourcePresenter<ItemBrandRaw>()

    return new CreateItemBrandController(usecase, presenter)
}

export const createItemBrandFactory = factory()
