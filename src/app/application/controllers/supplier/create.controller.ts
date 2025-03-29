import { CreateSupplierPort, SupplierDTO } from "@app/application/ports/usecases/supplier.usecase"
import { HttpRequestModel, HttpResponseModel } from "@core/application/models/http/http"
import { ControllerPort } from "@core/application/ports/controller.port"
import { PresenterPort } from "@core/application/ports/presenter.port"
import { RequestValidationErrorPresenter } from "@core/application/presenters/request-validation.presenter"

export class CreateSupplierController
    implements ControllerPort<SupplierDTO>
{
    constructor(
        private readonly usecase: CreateSupplierPort,
        private readonly presenter: PresenterPort<SupplierDTO>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'body'>
    ): Promise<HttpResponseModel<SupplierDTO>> {
        if (!request.body) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.body as SupplierDTO
        )

        return await this.presenter.handleResponse(result, 'Registro Exitoso!')
    }
}