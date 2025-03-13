import { type HttpRequestMiddlewareModel } from '../models/middlewares/http-request'
import { type HttpRequestModel } from '../models/http/http'
import {
    type JoiErrorDetailsModel,
    type JoiSchemaModel,
    type JoiValidationResultModel,
} from '../models/validators/joi'
import { type JoiValidationPort } from '../ports/joi-validation.port'
import { type MiddlewarePort } from '../ports/middleware.port'
import { serializedErrorStack } from '@core/shared/utils/serialized-error'
import { RequestValidationErrorPresenter } from '../presenters/request-validation.presenter'

export class JoiValidationService<T>
    implements MiddlewarePort, JoiValidationPort
{
    constructor(private readonly schema: JoiSchemaModel<T>) {}

    async handleRequest(request: HttpRequestMiddlewareModel): Promise<void> {
        try {
            await this.validate(this.schema, request)
        } catch (error: any) {
            const details: JoiErrorDetailsModel[] = error.details
            throw new RequestValidationErrorPresenter(
                serializedErrorStack(details)
            )
        }
    }

    async validate<T>(
        schema: JoiSchemaModel<any>,
        request: HttpRequestModel
    ): Promise<JoiValidationResultModel<T>> {
        return await schema.validateAsync(request.body, {
            abortEarly: false,
            allowUnknown: false,
        })
    }
}
