import { HttpResponseCode } from '../models/http/http'
import AppError from './app-error'

export class RepositoryErrorPresenter extends AppError {
    constructor(message: string, ref: string) {
        super(
            message,
            HttpResponseCode.notFound,
            ref
        )
    }
}
