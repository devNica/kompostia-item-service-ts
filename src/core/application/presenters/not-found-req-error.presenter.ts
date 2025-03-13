import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class NotFoundRequestErrorPresenter extends AppError {
    constructor(message?: string) {
        super(
            message ?? 'Recurso no encontrado',
            HttpResponseCode.notFound,
            'Recurso no encontrado'
        )
    }
}
