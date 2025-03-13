import { type EmptyResponseModel } from '../models/app/app.model'
import { type HttpResponseModel } from '../models/http/http'
import { type RedirecPort } from '../ports/presenter.port'

export class RedirectPresenter implements RedirecPort<EmptyResponseModel> {
    async handleRedirection(
        url: string
    ): Promise<HttpResponseModel<EmptyResponseModel>> {
        return {
            message: '',
            meta: {},
            statusCode: 302,
            headers: {
                Location: url,
                cacheControl: 'no-cache',
                contentLength: 0,
                contentType: '',
            },
        }
    }
}
