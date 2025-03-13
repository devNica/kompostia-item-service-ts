import { UpdateStorageLocationController } from '@app/application/controllers/location/upd-storage-location.controller'
import { UpdateStorageLocationUseCase } from '@app/application/usecases/location/upd-storage-location.usecase'
import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { storageLocationRepositoryImpl } from '@app/infrastructure/repositories/storage-location.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new UpdateStorageLocationUseCase(
        storageLocationRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<StorageLocationRaw>()

    return new UpdateStorageLocationController(usecase, presenter)
}

export const updateStorageLocationFactory = factory()
