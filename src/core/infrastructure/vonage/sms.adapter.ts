import { type SMSPayload, type SMSPort } from '@core/application/ports/sms.port'
import constants from '@core/shared/constants'
import { Vonage } from '@vonage/server-sdk'
import { Auth } from '@vonage/auth'

export class SMSAdapter implements SMSPort {
    private static instance: SMSAdapter

    private readonly apiKey = constants.VONAGE_API_KEY
    private readonly apiSecret = constants.VONAGE_API_SECRET
    private readonly sender: Vonage

    private constructor() {
        const credentials: Auth = new Auth({
            apiKey: this.apiKey,
            apiSecret: this.apiSecret,
        })

        this.sender = new Vonage(credentials)
    }

    static init(): SMSAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!SMSAdapter.instance) {
            SMSAdapter.instance = new SMSAdapter()
        }

        return SMSAdapter.instance
    }

    async sendSMS(payload: SMSPayload): Promise<void> {
        try {
            const response = await this.sender.sms.send({
                to: payload.to,
                from: payload.from || 'Vonage',
                text: payload.text,
            })

            console.log('Mensaje enviado con éxito:', response)
        } catch (error) {
            console.error('Error al enviar SMS:', error)
            throw new Error('No se pudo enviar el SMS')
        }
    }
}
