import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class UseCaseErrorPresenter extends AppError {
    constructor(message: string, ref: string) {
        super(
            message,
            HttpResponseCode.unprocessableEntity,
            `Error en la validaciones del caso de uso: ${ref}`
        )
    }
}
