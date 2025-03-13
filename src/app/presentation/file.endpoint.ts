import { downloadProductImageFactory } from '@app/factories/download-product-img.factory'
import { expressFileRouteAdapter } from '@core/infrastructure/express/express-file-route.adapter'
import { Router } from 'express'

export const fileRouter = Router()

fileRouter.get('/:fileId', expressFileRouteAdapter(downloadProductImageFactory))
