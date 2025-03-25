import { type Request } from 'express'

export type GenericReqParameterModel = Record<string, any>

export type HttpAttr =
    | 'body'
    | 'params'
    | 'query'
    | 'files'
    | 'headers'
    | 'data'

export interface HttpRequestModel<
    Body = GenericReqParameterModel,
    Params = GenericReqParameterModel,
    Query = GenericReqParameterModel,
    Files = Request['file'] | Request['files'],
    Headers = GenericReqParameterModel,
    Data = GenericReqParameterModel & {
        baseURL: string
        userId?: string | number
    },
> {
    body?: Body
    params?: Params
    query?: Query
    headers?: Headers
    files?: Files
    data?: Data
}

export enum HttpResponseCode {
    success = 200,
    created = 201,
    temporaryRedirect = 307,
    badRequest = 400,
    unAuthorized = 401,
    forbidden = 403,
    notFound = 404,
    conflict = 409,
    payloadToLarge = 413,
    unprocessableEntity = 422,
    internalServerError = 500,
}

export interface HttpResponseModel<T> {
    meta: T
    message: string
    statusCode: number
    headers?: {
        Location: string
        contentType: string
        contentLength: number
        cacheControl: 'no-cache' | 'cache'
    } & Record<string, any>
    view?: string
}
