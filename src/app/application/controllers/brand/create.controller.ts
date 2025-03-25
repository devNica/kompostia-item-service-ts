import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CreateItemBrandPort } from '@app/application/ports/usecases/brand.usecase.port'
import { hasRequiredKey } from '@core/shared/utils/validator'

export class CreateItemBrandController implements ControllerPort<ItemBrandRaw> {
    constructor(
        private readonly usecase: CreateItemBrandPort,
        private readonly presenter: PresenterPort<ItemBrandRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body'>
    ): Promise<HttpResponseModel<ItemBrandProps>> {
        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const data = request.body as ItemBrandProps

        const result = await this.usecase.run(data)

        return await this.presenter.handleResponse(result, 'Registro Exitoso!')
    }
}
