import { ListStorageLocationsController } from '@app/application/controllers/location/list.controller'
import { ListStorageLocationsUseCase } from '@app/application/usecases/location/list.usecase'
import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { storageLocationRepositoryImpl } from '@app/infrastructure/repositories/storage-location.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new ListStorageLocationsUseCase(
        storageLocationRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<StorageLocationRaw[]>()

    return new ListStorageLocationsController(usecase, presenter)
}

export const listStorageLocationsFactory = factory()
