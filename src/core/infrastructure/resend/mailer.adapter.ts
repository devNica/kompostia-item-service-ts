import {
    type MailerPort,
    type SimpleMailPayload,
} from '@core/application/ports/mailer.port'
import constants from '@core/shared/constants'
import { Resend } from 'resend'

export class MailerAdapter implements MailerPort {
    private static instance: MailerAdapter

    private readonly apiKey = constants.RESEND_API_KEY
    private readonly mailer: Resend

    private constructor() {
        this.mailer = new Resend(this.apiKey)
    }

    static init(): MailerAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!MailerAdapter.instance) {
            MailerAdapter.instance = new MailerAdapter()
        }

        return MailerAdapter.instance
    }

    async sendSimpleMail(data: SimpleMailPayload): Promise<void> {
        try {
            this.mailer.emails.send({
                from: data.from,
                to: data.to,
                subject: data.subject,
                html: data.html,
            })
        } catch (error) {
            console.log(error)
        }
    }
}
