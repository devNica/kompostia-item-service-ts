import { type HttpRequestModel } from '../http/http'

export interface HttpRequestMiddlewareModel extends HttpRequestModel {
    method?: string
}
