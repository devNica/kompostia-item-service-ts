import { createCategoryFactory } from '@app/factories/category/create-category.factory'
import { createStorageLocationFactory } from '@app/factories/location/create-storage-location.factory'
import { createItemBrandFactory } from '@app/factories/item-brand/create-item-brand.factory'
import { listCategoriesFactory } from '@app/factories/category/list-categories.factory'
import { getCategoryAncestorsFactory } from '@app/factories/category/get-category-ancestors.factory'
import { getLocationAncestorsFactory } from '@app/factories/location/get-location.ancestors.factory'
import { listStorageLocationsFactory } from '@app/factories/location/list-storage-locations.factory'
import { updateCategoryFactory } from '@app/factories/category/upd-category.factory'
import { updateStorageLocationFactory } from '@app/factories/location/upd-storage-location.factory'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route-adapter'
import { Router } from 'express'
import { listBrandsItemsFactory } from '@app/factories/item-brand/list-brands-items.factory'
import { updateBrandInformationFactory } from '@app/factories/item-brand/upd-brand-info.factory'

export const propsRouter = Router()

// obtener categorias
propsRouter.get('/categories', expressRouteAdapter(listCategoriesFactory))

// obtener ancestros de una categoria
propsRouter.get(
    '/categories/:categoryId/ancestors',
    expressRouteAdapter(getCategoryAncestorsFactory)
)

// crear categoria
propsRouter.post('/categories', expressRouteAdapter(createCategoryFactory))

// actualizar categoria
propsRouter.put(
    '/categories/:categoryId',
    expressRouteAdapter(updateCategoryFactory)
)

/** ****************************** LOCATIONS ********************************** */

propsRouter.get('/locations', expressRouteAdapter(listStorageLocationsFactory))

// obtener ancestros de una Ubicacion
propsRouter.get(
    '/locations/:locationId/ancestors',
    expressRouteAdapter(getLocationAncestorsFactory)
)

propsRouter.post(
    '/locations',
    expressRouteAdapter(createStorageLocationFactory)
)

propsRouter.put(
    '/locations/:locationId',
    expressRouteAdapter(updateStorageLocationFactory)
)

/// ///////////////////////////////////
propsRouter.post('/brands', expressRouteAdapter(createItemBrandFactory))

propsRouter.get('/brands', expressRouteAdapter(listBrandsItemsFactory))

propsRouter.put(
    '/brands/:brandId',
    expressRouteAdapter(updateBrandInformationFactory)
)
