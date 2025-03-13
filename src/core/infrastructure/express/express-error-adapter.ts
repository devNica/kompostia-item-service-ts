/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import AppError from '@core/application/presenters/app-error'
import { type NextFunction, type Request, type Response } from 'express'
import {} from 'csrf-csrf'
import { csrfSecurity } from '../csrf/csr.adapter'

export function expressErrorAdapter(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    if (!error) {
        next()
        return
    }

    console.log(error)

    if (error === csrfSecurity.getInstanceError()) {
        res.status(403).json({
            meta: {
                errorName: 'csrf validation error',
                messages: 'No se logro validar el token csrf',
            },
            message: 'No se logro validar el token csrf',
        })
    }

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            meta: {
                errorName: error.name,
                messages: error.message.split(','),
            },
            message: error.message,
        })
    }
}
