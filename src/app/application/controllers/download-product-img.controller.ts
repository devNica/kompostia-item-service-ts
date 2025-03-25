import { type ControllerPort } from '@core/application/ports/controller.port'
import { type DownloadCtgImageI } from '../ports/usecases/catalog-item.usecase.port'
import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '@core/application/models/http/http'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class DownloadCtgImageController implements ControllerPort<Buffer> {
    constructor(private readonly usecase: DownloadCtgImageI) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'params'>
    ): Promise<HttpResponseModel<Buffer>> {
        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        request.params as { fileId: string }

        const result = await this.usecase.run({ fileId: request.params.fileId })

        return {
            message: 'Peticion Exitosa',
            meta: result.binary,
            statusCode: 200,
            headers: {
                contentLength: result.filesize,
                contentType: result.filetype,
                cacheControl: 'no-cache',
                Location: '',
            },
        }
    }
}
