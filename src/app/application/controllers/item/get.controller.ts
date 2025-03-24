import { type ControllerPort } from '@core/application/ports/controller.port'
import { type GetCtgItemPort } from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export class GetCatalogItemController
    implements
        ControllerPort<
            CtgItemRaw,
            {
                params: { itemId: string }
                data: { baseURL: string }
            }
        >
{
    constructor(
        private readonly usecase: GetCtgItemPort,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(request: {
        params: { itemId: string }
        data: { baseURL: string }
    }): Promise<HttpResponseModel<CtgItemRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

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
