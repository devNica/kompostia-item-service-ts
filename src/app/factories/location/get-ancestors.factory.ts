import { GetLocationAncestorsController } from '@app/application/controllers/location/get-ancestors.controller'
import { GetLocationAncestorsUseCase } from '@app/application/usecases/location/get.usecase'
import { type NestedLocationRaw } from '@app/domain/entities/nested-location.entity'
import { storageLocationRepositoryImpl } from '@app/infrastructure/repositories/storage-location.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new GetLocationAncestorsUseCase(
        storageLocationRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<NestedLocationRaw>()

    return new GetLocationAncestorsController(usecase, presenter)
}

export const getLocationAncestorsFactory = factory()
