export interface SMSPayload {
    from: string
    to: string
    text: string
}

export interface SMSPort {
    sendSMS: (payload: SMSPayload) => Promise<void>
}
