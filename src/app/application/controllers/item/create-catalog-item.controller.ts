import { type ControllerPort } from '@core/application/ports/controller.port'
import { type CreateCtgItemI } from '../../ports/usecases/catalog-item.usecase.port'
import { type EmptyResponseModel } from '@core/application/models/app/app.model'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type FileModel } from '@core/application/models/files/file.model'

export class CreateCatalogItemController
    implements ControllerPort<EmptyResponseModel>
{
    constructor(
        private readonly usecase: CreateCtgItemI,
        private readonly presenter: PresenterPort<EmptyResponseModel>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<EmptyResponseModel>> {
        if (!hasRequiredKey(request, 'files')) {
            throw new RequestValidationErrorPresenter()
        }

        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const productData = JSON.parse(request.body.payload)

        await this.usecase.run(productData, request.files as FileModel[])

        return await this.presenter.handleResponse(
            {},
            'El articulo se ha registrado correctamente!'
        )
    }
}
