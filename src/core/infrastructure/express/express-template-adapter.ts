import type AppError from '@core/application/presenters/app-error'
import constants from '@core/shared/constants'
import { type NextFunction, type Request, type Response } from 'express'
import { csrfSecurity } from '../csrf/csr.adapter'

export function expressTemplateAdapter(templatePath: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
        await Promise.resolve()
            .then(() => {
                const csrfToken = csrfSecurity.getCSRFToken()

                response.render(templatePath, {
                    token: request.query.token ?? '',
                    prefix: constants.PREFIX,
                    csrfToken,
                })
            })
            .catch((err: AppError) => {
                next(err)
            })
    }
}
