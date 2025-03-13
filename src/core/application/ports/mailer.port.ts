export interface SimpleMailPayload {
    from: string
    to: string[]
    subject: string
    html: string
}

export interface MailerPort {
    sendSimpleMail: (data: SimpleMailPayload) => Promise<void>
}
