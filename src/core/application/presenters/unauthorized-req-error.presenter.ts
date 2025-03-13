import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class UnAuthorizedRequestErrorPresenter extends AppError {
    constructor(message?: string) {
        super(
            message ?? 'Acceso al recurso no autorizado',
            HttpResponseCode.unAuthorized,
            'Acceso al recurso no autorizado'
        )
    }
}
