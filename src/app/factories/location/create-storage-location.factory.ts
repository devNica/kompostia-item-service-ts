import { CreateStorageLocationController } from '@app/application/controllers/location/create-storage-location.controller'
import { CreateStorageLocationUseCase } from '@app/application/usecases/location/create-storage-location.usecase'
import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { storageLocationRepositoryImpl } from '@app/infrastructure/repositories/storage-location.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new CreateStorageLocationUseCase(
        storageLocationRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<StorageLocationRaw>()

    return new CreateStorageLocationController(usecase, presenter)
}

export const createStorageLocationFactory = factory()
