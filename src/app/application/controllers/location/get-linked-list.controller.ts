import { type LocationLinkedListRaw } from '@app/domain/entities/location-linked-list.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type GetLocationLinkedListPort } from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class GetLocationLinkedListController
    implements ControllerPort<LocationLinkedListRaw>
{
    constructor(
        private readonly usecase: GetLocationLinkedListPort,
        private readonly presenter: PresenterPort<LocationLinkedListRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'params'>
    ): Promise<HttpResponseModel<LocationLinkedListRaw>> {
        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { locationId: string }

        const result = await this.usecase.run(request.params.locationId)

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
