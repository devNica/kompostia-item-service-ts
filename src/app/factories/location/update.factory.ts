import { UpdateStorageLocationController } from '@app/application/controllers/location/upddate.controller'
import { type UpdateStorageLocationDTO } from '@app/application/ports/usecases/location.usecase.port'
import { UpdateStorageLocationUseCase } from '@app/application/usecases/location/update.usecase'
import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { storageLocationRepositoryImpl } from '@app/infrastructure/repositories/storage-location.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort<
    StorageLocationRaw,
    {
        body: UpdateStorageLocationDTO
        params: { locationId: string }
    }
> {
    const usecase = new UpdateStorageLocationUseCase(
        storageLocationRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<StorageLocationRaw>()

    return new UpdateStorageLocationController(usecase, presenter)
}

export const updateStorageLocationFactory = factory()
