import { UpdateBrandInformationController } from '@app/application/controllers/brand/update.controller'
import { UpdateBrandInformationUseCase } from '@app/application/usecases/brand/update.usecase'
import { type ItemBrandRaw } from '@app/domain/entities/brand.entity'
import { brandRepositoryImpl } from '@app/infrastructure/repositories/brand.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new UpdateBrandInformationUseCase(brandRepositoryImpl)

    const presenter = new SuccessRequestPresenter<ItemBrandRaw>()

    return new UpdateBrandInformationController(usecase, presenter)
}

export const updateBrandInformationFactory = factory()
