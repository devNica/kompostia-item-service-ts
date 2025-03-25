import { UpdateBrandInformationController } from '@app/application/controllers/item-brand/update.controller'
import { UpdateBrandInformationUseCase } from '@app/application/usecases/item-brand/update.usecase'
import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { itemBrandRepositoryImpl } from '@app/infrastructure/repositories/item-brand.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort<
    ItemBrandRaw,
    {
        body: ItemBrandProps
        params: { brandId: string }
    }
> {
    const usecase = new UpdateBrandInformationUseCase(itemBrandRepositoryImpl)

    const presenter = new SuccessRequestPresenter<ItemBrandRaw>()

    return new UpdateBrandInformationController(usecase, presenter)
}

export const updateBrandInformationFactory = factory()
