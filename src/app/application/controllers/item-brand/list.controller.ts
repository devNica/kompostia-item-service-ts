import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type ListBrandsItemsPort } from '../../ports/usecases/item-brand.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type QueryParams } from '@core/application/models/app/app.model'

export class ListBrandsItemsController
    implements
        ControllerPort<
            ItemBrandRaw[],
            {
                query: QueryParams
            }
        >
{
    constructor(
        private readonly usecase: ListBrandsItemsPort,
        private readonly presenter: PresenterPort<ItemBrandRaw[]>
    ) {}

    async handleRequest(request: {
        query: QueryParams
    }): Promise<HttpResponseModel<ItemBrandRaw[]>> {
        if (!hasRequiredKey(request, 'query')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run({
            value: request.query.value,
        })

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
