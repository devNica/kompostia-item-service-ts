import { type ControllerPort } from '@core/application/ports/controller.port'
import { type UpdateCtgItemCategoryI } from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export class UpdateCatalogItemCategoryController
    implements ControllerPort<CtgItemRaw>
{
    constructor(
        private readonly usecase: UpdateCtgItemCategoryI,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<CtgItemRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run({
            category: request.body.category,
            itemId: request.params.itemId,
        })

        return await this.presenter.handleResponse(
            result,
            'Actualizacion Exitosa!'
        )
    }
}
