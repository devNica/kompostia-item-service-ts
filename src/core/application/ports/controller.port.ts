import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '../models/http/http'

export interface ControllerPort<T = unknown> {
    handleRequest: (request: HttpRequestModel) => Promise<HttpResponseModel<T>>
}
