import { GetSupplierPort, SupplierDTO } from "@app/application/ports/usecases/supplier.usecase"
import { HttpRequestModel, HttpResponseModel } from "@core/application/models/http/http"
import { ControllerPort } from "@core/application/ports/controller.port"
import { PresenterPort } from "@core/application/ports/presenter.port"
import { RequestValidationErrorPresenter } from "@core/application/presenters/request-validation.presenter"


export class GetSupplierController
    implements ControllerPort<SupplierDTO>
{
    constructor(
        private readonly usecase: GetSupplierPort,
        private readonly presenter: PresenterPort<SupplierDTO>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel, 'params'>
    ): Promise<HttpResponseModel<SupplierDTO>> {
        if (!request.params) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.params.supplierId
        )

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}