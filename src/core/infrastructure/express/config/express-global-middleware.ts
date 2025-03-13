import { type Application, json, urlencoded } from 'express'
import morgan from 'morgan'

export async function expressGlobalMiddleware(app: Application): Promise<void> {
    app.use(json())
    app.use(urlencoded({ extended: true }))

    app.use(morgan('dev'))
}
