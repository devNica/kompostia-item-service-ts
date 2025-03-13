import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class ConflictErrorPresenter extends AppError {
    constructor(message: string) {
        super(message, HttpResponseCode.conflict, 'Conflicto con el Recurso')
    }
}
