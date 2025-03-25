import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '../models/http/http'

export interface ControllerPort<ResponseType = unknown> {
    handleRequest: (
        request: HttpRequestModel
    ) => Promise<HttpResponseModel<ResponseType>>
}
