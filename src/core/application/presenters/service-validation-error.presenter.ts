import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class ServiceValidationErrorPresenter extends AppError {
    constructor(message?: string) {
        super(
            message ?? 'Error en validacion de datos en el servicio',
            HttpResponseCode.badRequest,
            'Error en validacion de datos en el servicio'
        )
    }
}
