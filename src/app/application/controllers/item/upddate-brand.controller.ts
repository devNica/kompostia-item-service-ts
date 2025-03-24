import { type ControllerPort } from '@core/application/ports/controller.port'
import {
    type UpdCtgItemBrandDTO,
    type UpdateCtgItemBrandPort,
} from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'

export class UpdateCatalogItemBrandController
    implements
        ControllerPort<
            CtgItemRaw,
            {
                body: UpdCtgItemBrandDTO
                params: { itemId: string }
            }
        >
{
    constructor(
        private readonly usecase: UpdateCtgItemBrandPort,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(request: {
        body: UpdCtgItemBrandDTO
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
