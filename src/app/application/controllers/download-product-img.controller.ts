import { type ControllerPort } from '@core/application/ports/controller.port'
import { type DownloadCtgImageI } from '../ports/usecases/catalog-item.usecase.port'
import { type HttpResponseModel } from '@core/application/models/http/http'
import { hasRequiredKey } from '@core/shared/utils/validator'
import { RequestValidationErrorPresenter } from '@core/application/presenters/request-validation.presenter'

export class DownloadCtgImageController
    implements
        ControllerPort<
            Buffer,
            {
                params: { fileId: string }
            }
        >
{
    constructor(private readonly usecase: DownloadCtgImageI) {}

    async handleRequest(request: {
        params: { fileId: string }
    }): Promise<HttpResponseModel<Buffer>> {
        if (!hasRequiredKey(request, 'params')) {
            throw new RequestValidationErrorPresenter()
        }

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
