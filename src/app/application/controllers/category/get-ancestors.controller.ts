import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type NestedCategoryRaw } from '@app/domain/entities/nested-category.entity'
import { type GetCategoryAncestorsPort } from '../../ports/usecases/category.usecase.port'

export class GetCategoriesAncestorsController
    implements
        ControllerPort<NestedCategoryRaw, { params: { categoryId: string } }>
{
    constructor(
        private readonly usecase: GetCategoryAncestorsPort,
        private readonly presenter: PresenterPort<NestedCategoryRaw>
    ) {}

    async handleRequest(request: {
        params: { categoryId: string }
    }): Promise<HttpResponseModel<NestedCategoryRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(request.params.categoryId)

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
