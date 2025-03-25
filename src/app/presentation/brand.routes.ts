import { createItemBrandFactory } from '@app/factories/brand/create.factory'
import { listBrandsItemsFactory } from '@app/factories/brand/list.factory'
import { updateBrandInformationFactory } from '@app/factories/brand/update.factory'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route-adapter'
import { Router } from 'express'

export const brandRouter = Router()

brandRouter.post('/', expressRouteAdapter(createItemBrandFactory))

brandRouter.get('/', expressRouteAdapter(listBrandsItemsFactory))

brandRouter.put('/:brandId', expressRouteAdapter(updateBrandInformationFactory))
