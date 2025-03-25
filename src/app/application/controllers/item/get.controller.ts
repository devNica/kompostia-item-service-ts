import { type ControllerPort } from '@core/application/ports/controller.port'
import { type GetCtgItemPort } from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export class GetCatalogItemController implements ControllerPort<CtgItemRaw> {
    constructor(
        private readonly usecase: GetCtgItemPort,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'params' | 'data'>
    ): Promise<HttpResponseModel<CtgItemRaw>> {
        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        if (!request.data) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { itemId: string }
        request.data as { baseURL: string }

        const response = await this.usecase.run(
            { itemId: request.params.itemId },
            request.data.baseURL
        )

        return await this.presenter.handleResponse(
            response,
            'Peticion Exitosa!'
        )
    }
}
