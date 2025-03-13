import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type ListStorageLocationsI } from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class ListStorageLocationsController
    implements ControllerPort<StorageLocationRaw[]>
{
    constructor(
        private readonly usecase: ListStorageLocationsI,
        private readonly presenter: PresenterPort<StorageLocationRaw[]>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<StorageLocationRaw[]>> {
        if (!hasRequiredKey(request, 'query')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run({
            value: request.query.value,
        })

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
