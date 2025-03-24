import { createStorageLocationFactory } from '@app/factories/location/create.factory'
import { getLocationAncestorsFactory } from '@app/factories/location/get-ancestors.factory'
import { listStorageLocationsFactory } from '@app/factories/location/list.factory'
import { updateStorageLocationFactory } from '@app/factories/location/update.factory'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route-adapter'
import { Router } from 'express'

export const storageLocationRouter = Router()

/** *************************** STORAGE LOCATIONS ********************************** */
storageLocationRouter.get('/', expressRouteAdapter(listStorageLocationsFactory))

// obtener ancestros de una Ubicacion
storageLocationRouter.get(
    '/:locationId/ancestors',
    expressRouteAdapter(getLocationAncestorsFactory)
)

storageLocationRouter.post(
    '/',
    expressRouteAdapter(createStorageLocationFactory)
)

storageLocationRouter.put(
    '/:locationId',
    expressRouteAdapter(updateStorageLocationFactory)
)
