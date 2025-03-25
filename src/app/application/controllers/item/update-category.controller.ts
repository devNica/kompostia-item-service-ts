import { type ControllerPort } from '@core/application/ports/controller.port'
import {
    type CtgItemDTO,
    type UpdateCtgItemCategoryPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export class UpdateCatalogItemCategoryController
    implements ControllerPort<CtgItemRaw>
{
    constructor(
        private readonly usecase: UpdateCtgItemCategoryPort,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body' | 'params'>
    ): Promise<HttpResponseModel<CtgItemRaw>> {
        if (!request.body) {
            throw new RequestValidationErrorPresenter()
        }

        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { itemId: string }

        const result = await this.usecase.run(
            request.body as Pick<CtgItemDTO, 'category'>,
            request.params.itemId
        )

        return await this.presenter.handleResponse(
            result,
            'Actualizacion Exitosa!'
        )
    }
}
