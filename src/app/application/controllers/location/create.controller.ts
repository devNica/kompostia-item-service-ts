import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import {
    type CreateStorageLocationDTO,
    type CreateStorageLocationPort,
} from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class CreateStorageLocationController
    implements
        ControllerPort<
            StorageLocationRaw,
            {
                body: CreateStorageLocationDTO
            }
        >
{
    constructor(
        private readonly usecase: CreateStorageLocationPort,
        private readonly presenter: PresenterPort<StorageLocationRaw>
    ) {}

    async handleRequest(request: {
        body: CreateStorageLocationDTO
    }): Promise<HttpResponseModel<CreateStorageLocationDTO>> {
        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(request.body)

        return await this.presenter.handleResponse(result, 'Registro Exitoso!')
    }
}
