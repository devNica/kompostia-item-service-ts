import { InternalServerErrorPresenter } from '@core/application/presenters/internal-server-error.presenter'
import { type Request } from 'express'
import crypto from 'crypto'

export const getServerBaseURL = (request: Request | undefined): string => {
    if (!request) return ''

    try {
        const protocol = request.protocol || 'http' // protocolo por defecto
        const host = request.get('host') // Se incluye el puerto si esta definido

        if (!host) {
            throw new InternalServerErrorPresenter(
                'El host no esta definido en el request'
            )
        }

        // Construir la URL base usando el objeto URL

        const baseURL = new URL(`${protocol}://${host}`)
        return baseURL.toString()
    } catch (error) {
        console.error(
            'Error obteniendo la URL base del servidor:',
            (error as Error).message
        )
        return ''
    }
}

export const createHahsForInlineScripts = (scritpContent: string): string => {
    return crypto.createHash('sha256').update(scritpContent).digest('base64')
}
