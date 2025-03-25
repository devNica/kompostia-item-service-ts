import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import {
    type UpdateStorageLocationDTO,
    type UpdateStorageLocationPort,
} from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class UpdateStorageLocationController
    implements ControllerPort<StorageLocationRaw>
{
    constructor(
        private readonly usecase: UpdateStorageLocationPort,
        private readonly presenter: PresenterPort<StorageLocationRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body' | 'params'>
    ): Promise<HttpResponseModel<UpdateStorageLocationDTO>> {
        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        if (!request.body) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.body as UpdateStorageLocationDTO,
            request.params.locationId
        )

        return await this.presenter.handleResponse(
            result,
            'Actualizacion Exitosa!'
        )
    }
}
