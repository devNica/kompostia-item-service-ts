import { type NestedLocationRaw } from '@app/domain/entities/nested-location.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type GetLocationAncestorsPort } from '../../ports/usecases/location.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { hasRequiredKey } from '@core/shared/utils/validator'

export class GetLocationAncestorsController
    implements ControllerPort<NestedLocationRaw>
{
    constructor(
        private readonly usecase: GetLocationAncestorsPort,
        private readonly presenter: PresenterPort<NestedLocationRaw>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<NestedLocationRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(request.params.locationId)

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
