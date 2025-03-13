import { type HttpRequestMiddlewareModel } from '../models/middlewares/http-request'

export interface MiddlewarePort<T = unknown> {
    handleRequest: (request: HttpRequestMiddlewareModel) => Promise<T | never>
}
