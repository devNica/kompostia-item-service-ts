import { type StorageLocationRaw } from '@app/domain/entities/storage-location.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type ListStorageLocationsPort } from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type QueryParams } from '@core/application/models/app/app.model'

export class ListStorageLocationsController
    implements
        ControllerPort<
            StorageLocationRaw[],
            {
                query: QueryParams
            }
        >
{
    constructor(
        private readonly usecase: ListStorageLocationsPort,
        private readonly presenter: PresenterPort<StorageLocationRaw[]>
    ) {}

    async handleRequest(request: {
        query: QueryParams
    }): Promise<HttpResponseModel<StorageLocationRaw[]>> {
        if (!hasRequiredKey(request, 'query')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run({
            value: request.query.value,
        })

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
