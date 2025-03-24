import { type Request } from 'express'

export type GenericReqObject = Record<string, unknown>

export interface HttpRequestModel<
    Body = GenericReqObject,
    Params = GenericReqObject,
    Query = GenericReqObject,
    Files = Request['file'] | Request['files'],
    Headers = GenericReqObject,
    Data = Record<string, string> & {
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
