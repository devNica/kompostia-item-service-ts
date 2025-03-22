import { type ControllerPort } from '@core/application/ports/controller.port'
import { type GetCtgItemPort } from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export class GetCatalogItemController implements ControllerPort<CtgItemRaw> {
    constructor(
        private readonly usecase: GetCtgItemPort,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<CtgItemRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        const response = await this.usecase.run(
            { itemId: request.params.ItemImageDTO },
            request.data?.baseURL ?? ''
        )

        return await this.presenter.handleResponse(
            response,
            'Peticion Exitosa!'
        )
    }
}
