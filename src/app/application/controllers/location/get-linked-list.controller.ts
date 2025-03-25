import { type LocationLinkedListRaw } from '@app/domain/entities/location-linked-list.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type GetLocationLinkedListPort } from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { hasRequiredKey } from '@core/shared/utils/validator'

export class GetLocationLinkedListController
    implements
        ControllerPort<
            LocationLinkedListRaw,
            {
                params: { locationId: string }
            }
        >
{
    constructor(
        private readonly usecase: GetLocationLinkedListPort,
        private readonly presenter: PresenterPort<LocationLinkedListRaw>
    ) {}

    async handleRequest(request: {
        params: { locationId: string }
    }): Promise<HttpResponseModel<LocationLinkedListRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(request.params.locationId)

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
