import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class DomainErrorPresenter extends AppError {
    constructor(message: string, ref: string) {
        super(
            message,
            HttpResponseCode.unprocessableEntity,
            `Error de validaciones del dominio: ${ref}`
        )
    }
}
