import { CreateSupplierController } from "@app/application/controllers/supplier/create.controller"
import { SupplierDTO } from "@app/application/ports/usecases/supplier.usecase"
import { CreateSupplierUseCase } from "@app/application/usecases/supplier/create.usecase"
import { supplierRepositoryImpl } from "@app/infrastructure/repositories/supplier.repository"
import { ControllerPort } from "@core/application/ports/controller.port"
import { SuccessfullyCreatedResourcePresenter } from "@core/application/presenters/successfully-created-resource.presenter"


function factory(): ControllerPort {
    const usecase = new CreateSupplierUseCase(
        supplierRepositoryImpl
    )

    const presenter = new SuccessfullyCreatedResourcePresenter<SupplierDTO>()

    return new CreateSupplierController(usecase, presenter)
}

export const createSupplierFactory = factory()
