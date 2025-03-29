import { ListSupplierPort, SupplierDTO } from "@app/application/ports/usecases/supplier.usecase"
import { QueryParams } from "@core/application/models/app/app.model"
import { HttpRequestModel, HttpResponseModel } from "@core/application/models/http/http"
import { ControllerPort } from "@core/application/ports/controller.port"
import { PresenterPort } from "@core/application/ports/presenter.port"
import { RequestValidationErrorPresenter } from "@core/application/presenters/request-validation.presenter"

export class ListSupplierController
    implements ControllerPort<SupplierDTO[]>
{
    constructor(
        private readonly usecase: ListSupplierPort,
        private readonly presenter: PresenterPort<SupplierDTO[]>
    ) {}

    async handleRequest(
        request: Pick<HttpRequestModel,'query'>
    ): Promise<HttpResponseModel<SupplierDTO[]>> {
        
        if (!request.query) {
            throw new RequestValidationErrorPresenter()
        }

        const result = await this.usecase.run(
            request.query as QueryParams 
        )

        return await this.presenter.handleResponse(result, 'Peticion Exitosa!')
    }
}