import { VerifyProductSKUController } from '@app/application/controllers/verify-product-sku.controller'
import { type CtgItemDTO } from '@app/application/ports/usecases/catalog-item.usecase.port'
import { VerifyProductSKUUseCase } from '@app/application/usecases/verify-product-sku.usecase'
import { itemCategoryRepositoryImpl } from '@app/infrastructure/repositories/item-category.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort<
    { available: boolean },
    {
        body: Pick<CtgItemDTO, 'sku'>
    }
> {
    const usecase = new VerifyProductSKUUseCase(itemCategoryRepositoryImpl)

    const presenter = new SuccessRequestPresenter<{ available: boolean }>()

    return new VerifyProductSKUController(usecase, presenter)
}

export const verifyProductSKUFactory = factory()
