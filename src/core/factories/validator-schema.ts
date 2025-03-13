/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type JoiSchemaModel } from '@core/application/models/validators/joi'
import { JoiValidationService } from '@core/application/services/joi-validation.service'

export function validatorSchemaFactory<T>(schema: JoiSchemaModel<T>) {
    return new JoiValidationService(schema)
}
