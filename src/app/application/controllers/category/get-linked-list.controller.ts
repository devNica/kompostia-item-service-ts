import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import { type CategoryLinkedListRaw } from '@app/domain/entities/category-linked-list.entity'
import { type GetCategoryLinkedListPort } from '../../ports/usecases/category.usecase.port'

export class GetCategoriesLinkedListController
    implements ControllerPort<CategoryLinkedListRaw>
{
    constructor(
        private readonly usecase: GetCategoryLinkedListPort,
        private readonly presenter: PresenterPort<CategoryLinkedListRaw>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'params'>
    ): Promise<HttpResponseModel<CategoryLinkedListRaw>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { categoryId: string }

        const result = await this.usecase.run(request.params.categoryId)

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
