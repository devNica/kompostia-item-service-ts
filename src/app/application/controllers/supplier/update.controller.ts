import { SupplierDTO, SupplierUpdateDTO, UpdateSupplierPort } from "@app/application/ports/usecases/supplier.usecase"
import { HttpRequestModel, HttpResponseModel } from "@core/application/models/http/http"
import { ControllerPort } from "@core/application/ports/controller.port"
import { PresenterPort } from "@core/application/ports/presenter.port"
import { RequestValidationErrorPresenter } from "@core/application/presenters/request-validation.presenter"

export class UpdateSupplierController
    implements ControllerPort<SupplierDTO>
{
    constructor(
        private readonly usecase: UpdateSupplierPort,
        private readonly presenter: PresenterPort<SupplierDTO>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel,'body'| 'params'>
    ): Promise<HttpResponseModel<SupplierDTO>> {
        if (!request.body) {
            throw new RequestValidationErrorPresenter()
        }
        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.body as SupplierUpdateDTO,
            request.params.supplierId 
        )

        return await this.presenter.handleResponse(result, 'Actualizacion Exitosa!')
    }
}