import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class InternalServerErrorPresenter extends AppError {
    constructor(message?: string) {
        super(
            message ?? 'Error interno del servidor',
            HttpResponseCode.internalServerError,
            'Error interno del servidor'
        )
    }
}
