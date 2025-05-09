import {
    type EmptyRequestModel,
    type EmptyResponseModel,
} from '@core/application/models/app/app.model'
import { type UploadImageTestI } from '../ports/usecases/test.usecase'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { type PresenterPort } from '@core/application/ports/presenter.port'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { type FileModel } from '@core/application/models/files/file.model'

export class UploadImageTestController
    implements ControllerPort<EmptyResponseModel>
{
    constructor(
        private readonly usecase: UploadImageTestI,
        private readonly presenter: PresenterPort<EmptyResponseModel>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'files'>
    ): Promise<HttpResponseModel<EmptyResponseModel>> {
        if (!hasRequiredKey(request, 'files')) {
            throw new RequestValidationErrorPresenter()
        }

        await this.usecase.run(request.files as FileModel[])

        return await this.presenter.handleResponse({}, 'Exitoso!')
    }
}
