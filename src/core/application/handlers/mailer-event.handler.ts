import { type MailerPort, type SimpleMailPayload } from '../ports/mailer.port'
import { EventEmitter } from 'stream'
import constants from '@core/shared/constants'
import { InternalServerErrorPresenter } from '../presenters/internal-server-error.presenter'
import { type EmailEventPort } from '../ports/events.port'

const { EVENTS } = constants

export class MailerEventHandler extends EventEmitter implements EmailEventPort {
    // private mailerEmitter: MailerEventEmitter

    constructor(private readonly mailer: MailerPort) {
        super()
        // this.mailerEmitter = new MailerEventEmitter()
        this.registerEvents()
    }

    private registerEvents(): void {
        this.on(EVENTS.MAILER_EVENT, async (data: SimpleMailPayload) => {
            try {
                await this.mailer.sendSimpleMail(data)
            } catch (error) {
                throw new InternalServerErrorPresenter(
                    `Error de envio de correo: ${error as Error}`
                )
            }
        })
    }

    public send(data: SimpleMailPayload, eventName?: string): void {
        this.emit(eventName ?? EVENTS.MAILER_EVENT, data)
    }
}
