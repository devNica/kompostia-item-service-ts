import { UpdateSupplierController } from "@app/application/controllers/supplier/update.controller"
import { SupplierDTO } from "@app/application/ports/usecases/supplier.usecase"
import { UpdateSupplierUseCase } from "@app/application/usecases/supplier/update.usecase"
import { supplierRepositoryImpl } from "@app/infrastructure/repositories/supplier.repository"
import { ControllerPort } from "@core/application/ports/controller.port"
import { SuccessRequestPresenter } from "@core/application/presenters/success-request.presenter"


function factory(): ControllerPort {
    const usecase = new UpdateSupplierUseCase(
        supplierRepositoryImpl
    )

    const presenter = new SuccessRequestPresenter<SupplierDTO>()

    return new UpdateSupplierController(usecase, presenter)
}

export const updateSupplierFactory = factory()
