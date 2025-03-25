import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import {
    type CtgItemDTO,
    type VerifyProductSKUI,
} from '../ports/usecases/catalog-item.usecase.port'

export class VerifyProductSKUController
    implements ControllerPort<{ available: boolean }>
{
    constructor(
        private readonly usecase: VerifyProductSKUI,
        private readonly presenter: PresenterPort<{ available: boolean }>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body'>
    ): Promise<HttpResponseModel<{ available: boolean }>> {
        if (!request.body) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.body as Pick<CtgItemDTO, 'sku'>
        )

        return await this.presenter.handleResponse(result, 'Exitoso!')
    }
}
