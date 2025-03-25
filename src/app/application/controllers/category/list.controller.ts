import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type CategoryRaw } from '@app/domain/entities/category.entity'
import { type ListCategoriesPort } from '../../ports/usecases/category.usecase.port'
import { type QueryParams } from '@core/application/models/app/app.model'

export class ListCategoriesController implements ControllerPort<CategoryRaw[]> {
    constructor(
        private readonly usecase: ListCategoriesPort,
        private readonly presenter: PresenterPort<CategoryRaw[]>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'query'>
    ): Promise<HttpResponseModel<CategoryRaw[]>> {
        if (!hasRequiredKey(request, 'query')) {
            throw new RequestValidationErrorPresenter()
        }

        request.query as QueryParams

        const result = await this.usecase.run({
            value: request.query.value,
        })

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}
