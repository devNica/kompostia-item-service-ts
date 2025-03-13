import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { hasRequiredKey } from '@core/shared/utils/validator'
import {
    type ProductDTO,
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
        request: HttpRequestModel<Pick<ProductDTO, 'sku'>>
    ): Promise<HttpResponseModel<{ available: boolean }>> {
        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(request.body)

        return await this.presenter.handleResponse(result, 'Exitoso!')
    }
}
