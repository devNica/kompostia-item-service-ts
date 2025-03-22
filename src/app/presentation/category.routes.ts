import { createCategoryFactory } from '@app/factories/category/create.factory'
import { listCategoriesFactory } from '@app/factories/category/list.factory'
import { getCategoryAncestorsFactory } from '@app/factories/category/get-ancestors.factory'
import { updateCategoryFactory } from '@app/factories/category/update.factory'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route-adapter'
import { Router } from 'express'

export const categoryRouter = Router()

// obtener categorias
categoryRouter.get('/', expressRouteAdapter(listCategoriesFactory))

// obtener ancestros de una categoria
categoryRouter.get(
    '/:categoryId/ancestors',
    expressRouteAdapter(getCategoryAncestorsFactory)
)

// crear categoria
categoryRouter.post('/', expressRouteAdapter(createCategoryFactory))

// actualizar categoria
categoryRouter.put(
    '/:categoryId',
    expressRouteAdapter(updateCategoryFactory)
)