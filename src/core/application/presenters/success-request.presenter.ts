import { HttpResponseCode, type HttpResponseModel } from '../models/http/http'
import { type PresenterPort } from '../ports/presenter.port'

export class SuccessRequestPresenter<T> implements PresenterPort<T> {
    async handleResponse(
        meta: T,
        message: string
    ): Promise<HttpResponseModel<T>> {
        return {
            statusCode: HttpResponseCode.success,
            meta,
            message,
        }
    }
}
