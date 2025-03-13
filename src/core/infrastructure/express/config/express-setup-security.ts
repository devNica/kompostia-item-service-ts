import {
    type Application,
    type NextFunction,
    type Request,
    type Response,
} from 'express'
import crypto from 'crypto'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { csrfSecurity } from '@core/infrastructure/csrf/csr.adapter'

import constants from '@core/shared/constants'

export async function expressSetupSecurity(app: Application): Promise<void> {
    app.set('trust proxy', false)
    app.disabled('x-powered-by')

    app.use((_req: Request, res: Response, next: NextFunction) => {
        const nonce = crypto.randomBytes(16).toString('base64')
        // console.log('nonce: ', nonce)
        res.locals.nonce = nonce
        res.setHeader(
            'Content-Security-Policy',
            `script-src 'self' 'nonce-${nonce}'`
        )
        next()
    })

    app.use(cookieParser(constants.COOKIES_SECRET))

    app.use((req: Request, res: Response, next: NextFunction) => {
        csrfSecurity.setCSRFToken(req, res)

        res.cookie('x-csrf-token', csrfSecurity.getCSRFToken(), {
            httpOnly: true, // Protege contra ataques XSS
            secure: true, // Desactiva la seguridad para HTTPS
            sameSite: 'lax', // Define SameSite para proteger contra CSRF básico
            path: '/', // Define el alcance de la cookie
        })
        next()
    })

    app.use(helmet())
}
