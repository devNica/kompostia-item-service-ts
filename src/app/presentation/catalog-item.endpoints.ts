import { createCatalogItemFactory } from '@app/factories/item/create.factory'
import { getCatalogItemFactory } from '@app/factories/item/get.factory'
import { updateCatalogItemBrandFactory } from '@app/factories/item/update-brand.factory'
import { updateCatalogItemCategoryFactory } from '@app/factories/item/upddate-category.factory'
import { uploadImgTestFactory } from '@app/factories/upload-img-test.factory'
import { verifyProductSKUFactory } from '@app/factories/verify-product-sku.factory'
import { uploadFilesMiddleware } from '@core/application/middlewares/multer.middleware'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route-adapter'
import { Router } from 'express'

export const catalogItemRouter = Router()

catalogItemRouter.post(
    '',
    uploadFilesMiddleware.array('files', 2),
    expressRouteAdapter(createCatalogItemFactory)
)

catalogItemRouter.post(
    '/sku/verify',
    expressRouteAdapter(verifyProductSKUFactory)
)

catalogItemRouter.post(
    '/image/upload',
    uploadFilesMiddleware.array('files', 2),
    expressRouteAdapter(uploadImgTestFactory)
)

catalogItemRouter.patch(
    '/:itemId/brand',
    expressRouteAdapter(updateCatalogItemBrandFactory)
)

catalogItemRouter.patch(
    '/:itemId/category',
    expressRouteAdapter(updateCatalogItemCategoryFactory)
)

catalogItemRouter.get('/:itemId', expressRouteAdapter(getCatalogItemFactory))
