import { type SimpleMailPayload } from './mailer.port'
import { type SMSPayload } from './sms.port'

export interface SMSEventPort {
    send: (payload: SMSPayload, eventName?: string) => void
}

export interface EmailEventPort {
    send: (payload: SimpleMailPayload, eventName?: string) => void
}
