import { ListBrandsItemsController } from '@app/application/controllers/item-brand/list.controller'
import { ListBrandsItemsUseCase } from '@app/application/usecases/item-brand/list.usecase'
import { type ItemBrandRaw } from '@app/domain/entities/item-brand.entity'
import { itemBrandRepositoryImpl } from '@app/infrastructure/repositories/item-brand.repository'
import { type QueryParams } from '@core/application/models/app/app.model'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort<
    ItemBrandRaw[],
    {
        query: QueryParams
    }
> {
    const usecase = new ListBrandsItemsUseCase(itemBrandRepositoryImpl)

    const presenter = new SuccessRequestPresenter<ItemBrandRaw[]>()

    return new ListBrandsItemsController(usecase, presenter)
}

export const listBrandsItemsFactory = factory()
