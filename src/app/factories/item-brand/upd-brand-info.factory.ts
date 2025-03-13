import { UpdateBrandInformationController } from '@app/application/controllers/item-brand/upd-brand-info.controller'
import { UpdateBrandInformationUseCase } from '@app/application/usecases/item-brand/upd-brand-info.usecase'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { itemBrandRepositoryImpl } from '@app/infrastructure/repositories/item-brand.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new UpdateBrandInformationUseCase(itemBrandRepositoryImpl)

    const presenter = new SuccessRequestPresenter<ItemBrandRaw>()

    return new UpdateBrandInformationController(usecase, presenter)
}

export const updateBrandInformationFactory = factory()
