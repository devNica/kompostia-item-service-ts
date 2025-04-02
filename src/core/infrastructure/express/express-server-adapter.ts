import { type EndPointModel } from '@core/presentation/models/api/endpoint.model'
import { expressGlobalMiddleware } from '@core/infrastructure/express/config/express-global-middleware'
import { expressHandleError } from '@core/infrastructure/express/config/express-handle-error'
import { expressHandleRoutes } from '@core/infrastructure/express/config/express-handle-routes'
import { type Server } from 'http'
import { expressTemplateEngine } from './config/express-template-engine'
import { expressSetupSecurity } from './config/express-setup-security'
import { type LoggerPort } from '@core/application/ports/logger.port'
import { type SecureContextOptions } from 'tls'
import { catalogItemRouter } from '@app/presentation/catalog-item.endpoints'
import { fileRouter } from '@app/presentation/file.routes'
import { storageLocationRouter } from '@app/presentation/location.routes'
import { brandRouter } from '@app/presentation/brand.routes'
import { categoryRouter } from '@app/presentation/category.routes'
import express, { type Application } from 'express'
import https from 'https'
import cors from 'cors'
import fs from 'fs'
import { supplierRouter } from '@app/presentation/supplier.routes'

export class ExpressServerAdapter {
    private readonly controllers: EndPointModel[] = []
    private readonly expressApp: Application
    private readonly server: Server

    constructor(
        private readonly serverPort: number,
        private readonly prefix: string,
        private readonly logger: LoggerPort
    ) {
        this.expressApp = express()
        this.server = this.setSSLCertificates()
    }

    private setSSLCertificates(): Server {
        const credentials: SecureContextOptions = {
            key: fs.readFileSync(
                'src/core/infrastructure/certificates/localhost.key',
                'utf8'
            ),
            cert: fs.readFileSync(
                'src/core/infrastructure/certificates/localhost.crt',
                'utf8'
            ),
        }

        return https.createServer(
            credentials,
            this.expressApp.use(cors({ origin: '*' }))
        )
    }

    private controllerRegister(): void {
        this.controllers.push({
            path: `/${this.prefix}/items`,
            controller: catalogItemRouter,
        })

        this.controllers.push({
            path: `/${this.prefix}/file`,
            controller: fileRouter,
        })

        this.controllers.push({
            path: `/${this.prefix}/locations`,
            controller: storageLocationRouter,
        })

        this.controllers.push({
            path: `/${this.prefix}/brands`,
            controller: brandRouter,
        })

        this.controllers.push({
            path: `/${this.prefix}/categories`,
            controller: categoryRouter,
        })

        this.controllers.push({
            path: `/${this.prefix}/suppliers`,
            controller: supplierRouter,
        })
    }

    public async start(): Promise<void> {
        this.controllerRegister()
        await expressSetupSecurity(this.expressApp)
        await expressGlobalMiddleware(this.expressApp)
        await expressTemplateEngine(this.expressApp)

        await expressHandleRoutes(this.expressApp, this.controllers)
        await expressHandleError(this.expressApp)

        this.server.listen(this.serverPort, () => {
            this.logger.LogInfo(
                `🚀 Server is running on port: ${String(this.serverPort)}`
            )
        })
    }
}
