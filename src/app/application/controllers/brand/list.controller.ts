import { type ItemBrandRaw } from '@app/domain/entities/brand.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type ListBrandsItemsPort } from '../../ports/usecases/brand.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type QueryParams } from '@core/application/models/app/app.model'

export class ListBrandsItemsController
    implements ControllerPort<ItemBrandRaw[]>
{
    constructor(
        private readonly usecase: ListBrandsItemsPort,
        private readonly presenter: PresenterPort<ItemBrandRaw[]>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'query'>
    ): Promise<HttpResponseModel<ItemBrandRaw[]>> {
        if (!hasRequiredKey(request, 'query')) {
            throw new RequestValidationErrorPresenter()
        }

        const query = request.query as QueryParams

        const result = await this.usecase.run({
            value: query.value,
        })

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
