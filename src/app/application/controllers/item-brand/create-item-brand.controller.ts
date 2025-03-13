import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/item-brand.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CreateItemBrandI } from '@app/application/ports/usecases/item-brand.usecase.port'

export class CreateItemBrandController implements ControllerPort<ItemBrandRaw> {
    constructor(
        private readonly usecase: CreateItemBrandI,
        private readonly presenter: PresenterPort<ItemBrandRaw>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<ItemBrandProps>> {
        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(request.body)

        return await this.presenter.handleResponse(result, 'Registro Exitoso!')
    }
}
