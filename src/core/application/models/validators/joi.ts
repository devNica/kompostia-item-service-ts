import type Joi from 'joi'

export type JoiSchemaModel<T> = Joi.ObjectSchema<T>
export type JoiValidationResultModel<U> = Joi.ValidationResult<U>

export interface JoiErrorDetailsModel {
    message: string
    path: string[]
    type: string
    context: Record<string, any>
}
