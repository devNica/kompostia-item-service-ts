import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type ListBrandsItemsPort } from '../../ports/usecases/item-brand.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class ListBrandsItemsController
    implements ControllerPort<ItemBrandRaw[]>
{
    constructor(
        private readonly usecase: ListBrandsItemsPort,
        private readonly presenter: PresenterPort<ItemBrandRaw[]>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<ItemBrandRaw[]>> {
        if (!hasRequiredKey(request, 'query')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run({
            value: request.query.value,
        })

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
