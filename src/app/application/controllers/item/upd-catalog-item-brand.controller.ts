import { type ControllerPort } from '@core/application/ports/controller.port'
import { type UpdateCtgItemBrandI } from '../../ports/usecases/catalog-item.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { type CtgItemRaw } from '@app/domain/aggregates/catalog-item.aggregate'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'

export class UpdateCatalogItemBrandController
    implements ControllerPort<CtgItemRaw>
{
    constructor(
        private readonly usecase: UpdateCtgItemBrandI,
        private readonly presenter: PresenterPort<CtgItemRaw>
    ) {}

    async handleRequest(
        request: HttpRequestModel<{
            brand: Required<Omit<ItemBrandRaw, 'isActive'>>
        }>
    ): Promise<HttpResponseModel<CtgItemRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run({
            brand: request.body.brand,
            itemId: request.params.itemId,
        })

        return await this.presenter.handleResponse(
            result,
            'Actualizacion Exitosa!'
        )
    }
}
