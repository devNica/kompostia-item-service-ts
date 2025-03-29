import { GetSupplierController } from "@app/application/controllers/supplier/get.controller"
import { SupplierDTO } from "@app/application/ports/usecases/supplier.usecase"
import { GetSupplierUseCase } from "@app/application/usecases/supplier/get.usecase"
import { supplierRepositoryImpl } from "@app/infrastructure/repositories/supplier.repository"
import { ControllerPort } from "@core/application/ports/controller.port"
import { SuccessRequestPresenter } from "@core/application/presenters/success-request.presenter"

function factory(): ControllerPort {
    const usecase = new GetSupplierUseCase(
        supplierRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<SupplierDTO>()

    return new GetSupplierController(usecase, presenter)
}

export const getSupplierFactory = factory()
