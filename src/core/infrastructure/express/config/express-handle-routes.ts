import { type EndPointModel } from '@core/presentation/models/api/endpoint.model'
import {
    type Request,
    type Response,
    type NextFunction,
    type Application,
} from 'express'
const listEndpoints = require('express-list-endpoints')

export async function expressHandleRoutes(
    app: Application,
    routes: EndPointModel[],
    printRoutes = false
): Promise<void> {
    routes.forEach((route) => {
        app.use(route.path, route.controller)
    })

    if (printRoutes) {
        app.use((_req: Request, _res: Response, next: NextFunction) => {
            console.log('Rutas Registradas:')
            console.log(listEndpoints(app))
            next()
        })
    }
}
