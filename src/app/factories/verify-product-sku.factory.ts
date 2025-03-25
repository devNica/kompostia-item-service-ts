import { VerifyProductSKUController } from '@app/application/controllers/verify-product-sku.controller'
import { VerifyProductSKUUseCase } from '@app/application/usecases/verify-product-sku.usecase'
import { categoryRepositoryImpl } from '@app/infrastructure/repositories/category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort {
    const usecase = new VerifyProductSKUUseCase(categoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<{ available: boolean }>()

    return new VerifyProductSKUController(usecase, presenter)
}

export const verifyProductSKUFactory = factory()
