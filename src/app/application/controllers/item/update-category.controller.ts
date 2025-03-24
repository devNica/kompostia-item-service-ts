import { type ControllerPort } from '@core/application/ports/controller.port'
import {
    type CtgItemDTO,
    type UpdateCtgItemCategoryPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export class UpdateCatalogItemCategoryController
    implements
        ControllerPort<
            CtgItemRaw,
            {
                body: Pick<CtgItemDTO, 'category'>
                params: { itemId: string }
            }
        >
{
    constructor(
        private readonly usecase: UpdateCtgItemCategoryPort,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(request: {
        body: Pick<CtgItemDTO, 'category'>
        params: { itemId: string }
    }): Promise<HttpResponseModel<CtgItemRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.body,
            request.params.itemId
        )

        return await this.presenter.handleResponse(
            result,
            'Actualizacion Exitosa!'
        )
    }
}
