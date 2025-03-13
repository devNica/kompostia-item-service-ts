import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class ForbiddenRequestErrorPresenter extends AppError {
    constructor(message?: string) {
        super(
            message ?? 'Acceso al recurso no autorizado',
            HttpResponseCode.forbidden,
            'Acceso al recurso no autorizado'
        )
    }
}
