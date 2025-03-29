import { ListSupplierController } from "@app/application/controllers/supplier/list.controller"
import { SupplierDTO } from "@app/application/ports/usecases/supplier.usecase"
import { ListSupplierUseCase } from "@app/application/usecases/supplier/list.usecase"
import { supplierRepositoryImpl } from "@app/infrastructure/repositories/supplier.repository"
import { ControllerPort } from "@core/application/ports/controller.port"
import { SuccessRequestPresenter } from "@core/application/presenters/success-request.presenter"

function factory(): ControllerPort {
    const usecase = new ListSupplierUseCase(
        supplierRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<SupplierDTO[]>()

    return new ListSupplierController(usecase, presenter)
}

export const listSupplierFactory = factory()