import { type HttpRequestModel } from '../models/http/http'
import {
    type JoiSchemaModel,
    type JoiValidationResultModel,
} from '../models/validators/joi'

export interface JoiValidationPort {
    validate: <T>(
        schema: JoiSchemaModel<T>,
        request: HttpRequestModel
    ) => Promise<JoiValidationResultModel<T>>
}
