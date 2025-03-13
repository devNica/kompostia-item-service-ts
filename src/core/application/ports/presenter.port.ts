import { type HttpResponseModel } from '../models/http/http'

export interface PresenterPort<T> {
    handleResponse: (meta: T, message: string) => Promise<HttpResponseModel<T>>
}

export interface RedirecPort<T> {
    handleRedirection: (url: string) => Promise<HttpResponseModel<T>>
}
