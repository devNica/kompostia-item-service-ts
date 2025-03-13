import { createCatalogItemFactory } from '@app/factories/item/create-catalog-item.factory'
import { getCatalogItemFactory } from '@app/factories/item/get-catalog-item.factory'
import { updateCatalogItemBrandFactory } from '@app/factories/item/upd-catalog-item-brand.factory'
import { updateCatalogItemCategoryFactory } from '@app/factories/item/upd-catalog-item-category.factory'
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
