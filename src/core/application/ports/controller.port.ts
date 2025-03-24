import {
    type HttpRequestModel,
    type HttpResponseModel,
} from '../models/http/http'

export interface ControllerPort<
    ResponseType = unknown,
    RequestProps = Partial<HttpRequestModel>,
> {
    handleRequest: (request: {
        [K in keyof RequestProps]: RequestProps[K]
    }) => Promise<HttpResponseModel<ResponseType>>
}
