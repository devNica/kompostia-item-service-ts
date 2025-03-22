import { type ControllerPort } from '@core/application/ports/controller.port'
import { type CreateCategoryPort } from '../../ports/usecases/category.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { type CategoryRaw } from '@app/domain/entities/category.entity'

export class CreateCategoryController implements ControllerPort<CategoryRaw> {
    constructor(
        private readonly usecase: CreateCategoryPort,
        private readonly presenter: PresenterPort<CategoryRaw>
    ) {}

    async handleRequest(
        request: HttpRequestModel<any>
    ): Promise<HttpResponseModel<CategoryRaw>> {
        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(request.body)

        return await this.presenter.handleResponse(result, 'Registro Exitoso!')
    }
}
