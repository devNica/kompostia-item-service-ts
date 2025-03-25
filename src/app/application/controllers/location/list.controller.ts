import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type ListStorageLocationsPort } from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type QueryParams } from '@core/application/models/app/app.model'

export class ListStorageLocationsController
    implements ControllerPort<StorageLocationRaw[]>
{
    constructor(
        private readonly usecase: ListStorageLocationsPort,
        private readonly presenter: PresenterPort<StorageLocationRaw[]>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'query'>
    ): Promise<HttpResponseModel<StorageLocationRaw[]>> {
        if (!request.query) {
            throw new RequestValidationErrorPresenter()
        }

        request.query as QueryParams

        const result = await this.usecase.run({
            value: request.query.value,
        })

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
