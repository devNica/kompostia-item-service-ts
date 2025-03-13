import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type UpdateBrandInformationI } from '../../ports/usecases/item-brand.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class UpdateBrandInformationController
    implements ControllerPort<ItemBrandRaw>
{
    constructor(
        private readonly usecase: UpdateBrandInformationI,
        private readonly presenter: PresenterPort<ItemBrandRaw>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<ItemBrandRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.body,
            request.params.brandId
        )

        return await this.presenter.handleResponse(
            result,
            'Actualizacion Exitosa!'
        )
    }
}
