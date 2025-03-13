import constants from '@core/shared/constants'
import {
    type CsrfTokenCreator,
    doubleCsrf,
    type doubleCsrfProtection,
    type DoubleCsrfUtilities,
} from 'csrf-csrf'
import { type Request, type Response } from 'express'
import { type HttpError } from 'http-errors'

class CSRFAdapter {
    private static instance: CSRFAdapter

    private readonly securityOptions: DoubleCsrfUtilities

    private csrfToken: string

    private constructor() {
        this.securityOptions = doubleCsrf({
            getSecret: () => constants.CSRF_SECRET,
            cookieName: '__Host-psifi.x-csrf-token',
            cookieOptions: { httpOnly: true, sameSite: 'strict', secure: true },
            size: 64,
            ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
            errorConfig: {
                statusCode: 403,
                message: 'Invalid csrf token',
                code: 'EBADCSRFTOKEN',
            },
            // getTokenFromRequest: (req) => req.headers['x-csrf-token'],
            /// getTokenFromRequest: (req) => req.cookies['__Host-psifi.x-csrf-token'] || req.headers['x-csrf-token'],
            getTokenFromRequest: (req) =>
                req.cookies['x-csrf-token'] || req.headers['x-csrf-token'],
        })
    }

    static init(): CSRFAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!CSRFAdapter.instance) {
            CSRFAdapter.instance = new CSRFAdapter()
        }

        return CSRFAdapter.instance
    }

    getUtilities(): DoubleCsrfUtilities {
        return this.securityOptions
    }

    getCSRFMiddleware(): doubleCsrfProtection {
        return this.securityOptions.doubleCsrfProtection
    }

    generatorCSRFToken(): CsrfTokenCreator {
        return this.securityOptions.generateToken
    }

    setCSRFToken(req: Request, res: Response): void {
        this.csrfToken = this.securityOptions.generateToken(req, res)
    }

    getCSRFToken(): string {
        return this.csrfToken
    }

    getInstanceError(): HttpError {
        return this.securityOptions.invalidCsrfTokenError
    }
}

export const csrfSecurity = CSRFAdapter.init()
