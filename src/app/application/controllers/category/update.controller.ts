import {
    type CategoryProps,
    type CategoryRaw,
} from '@app/domain/entities/category.entity'
import { type UpdateCategoryPort } from '../../ports/usecases/category.usecase.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { hasRequiredKey } from '@core/shared/utils/validator'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'

export class UpdateCategoryController implements ControllerPort<CategoryRaw> {
    constructor(
        private readonly usecase: UpdateCategoryPort,
        private readonly presenter: PresenterPort<CategoryRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body' | 'params'>
    ): Promise<HttpResponseModel<CategoryRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        if (!hasRequiredKey(request, 'body')) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { categoryId: string }

        const result = await this.usecase.run(
            request.body as CategoryProps,
            request.params.categoryId
        )

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
