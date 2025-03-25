import {
    type ItemBrandProps,
    type ItemBrandRaw,
} from '@app/domain/entities/brand.entity'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type UpdateBrandInformationPort } from '../../ports/usecases/brand.usecase.port'
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
        private readonly usecase: UpdateBrandInformationPort,
        private readonly presenter: PresenterPort<ItemBrandRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body' | 'params'>
    ): Promise<HttpResponseModel<ItemBrandRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { brandId: string }

        const result = await this.usecase.run(
            request.body as ItemBrandProps,
            request.params.brandId
        )

        return await this.presenter.handleResponse(
            result,
            'Actualizacion Exitosa!'
        )
    }
}
