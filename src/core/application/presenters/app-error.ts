import { type ErrorHandlerPort } from '../ports/error-handler.port'

export default class AppError extends Error implements ErrorHandlerPort {
    public readonly name: string
    public readonly message: string
    public readonly messages?: string[] | undefined
    public readonly statusCode: number

    constructor(message: string, statusCode: number, errorName: string) {
        super(message)
        this.message = message ?? this.name
        this.statusCode = statusCode
        this.name = errorName

        /* eslint-disable  @typescript-eslint/strict-boolean-expressions */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
