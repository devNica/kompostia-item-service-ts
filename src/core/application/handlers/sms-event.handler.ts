import { EventEmitter } from 'stream'
import { type SMSPayload, type SMSPort } from '../ports/sms.port'
import constants from '@core/shared/constants'
import { InternalServerErrorPresenter } from '../presenters/internal-server-error.presenter'
import { type SMSEventPort } from '../ports/events.port'

const { EVENTS } = constants

export class SMSEventHandler extends EventEmitter implements SMSEventPort {
    constructor(private readonly sender: SMSPort) {
        super()
        this.registerEvents()
    }

    private registerEvents(): void {
        this.on(EVENTS.SMS_EVENT, async (data: SMSPayload) => {
            try {
                await this.sender.sendSMS(data)
            } catch (error) {
                throw new InternalServerErrorPresenter(
                    `Error de envio de correo: ${error as Error}`
                )
            }
        })
    }

    public send(data: SMSPayload, eventName?: string): void {
        this.emit(eventName ?? EVENTS.SMS_EVENT, data)
    }
}
