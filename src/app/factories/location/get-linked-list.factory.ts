import { GetLocationLinkedListController } from '@app/application/controllers/location/get-linked-list.controller'
import { GetLocationLinkedListUseCase } from '@app/application/usecases/location/get-linked-list.usecase'
import { type LocationLinkedListRaw } from '@app/domain/entities/location-linked-list.entity'
import { storageLocationRepositoryImpl } from '@app/infrastructure/repositories/storage-location.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new GetLocationLinkedListUseCase(
        storageLocationRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<LocationLinkedListRaw>()

    return new GetLocationLinkedListController(usecase, presenter)
}

export const getLocationLinkedListFactory = factory()
