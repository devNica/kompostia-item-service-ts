import { type ControllerPort } from '@core/application/ports/controller.port'
import AppError from '@core/application/presenters/app-error'
import { getServerBaseURL } from '@core/shared/utils/server.util'
import { type NextFunction, type Request, type Response } from 'express'

export function expressFileRouteAdapter<T>(controller: ControllerPort<T>) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const ctrl = await controller.handleRequest({
                body: request.body,
                params: request.params,
                query: request.query,
                headers: request.headers,
                files: request.file ?? request.files,
                data: { baseURL: getServerBaseURL(request) },
            })

            response.set({
                'Cache-Control': ctrl.headers?.cacheControl,
                'Content-Type': ctrl.headers?.contentType,
                'Content-Length': ctrl.headers?.contentLength,
            })
            response.send(ctrl.meta)

            next()
        } catch (err: unknown) {
            if (err instanceof AppError) {
                next(err)
            } else {
                // Si no es una instancia de AppError, lo tratamos como un error genérico
                next(new AppError(String(err), 500, 'Error inesperado'))
            }
        }
    }
}
