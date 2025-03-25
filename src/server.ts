import { ExpressServerAdapter } from '@core/infrastructure/express/express-server-adapter'
import { WinstonLoggerAdapter } from '@core/shared/winston/winston.adapter'
// import { OpenTelemetryAdapter } from '@core/infrastructure/otlp/otlp.adapter'
import constants from '@core/shared/constants'
import { dbConnectionAdapter } from '@core/infrastructure/db/db.adapter'
import { getDatabaseCrendential } from '@core/shared/configs/db-credentials'

const { PREFIX, SERVER_PORT } = constants

async function startAuthService(): Promise<void> {
    // const optl = OpenTelemetryAdapter.newInstance()
    // await optl.start().catch(console.error)

    // Permite que los modelos se inicalicen con las credenciales de cada ms
    await dbConnectionAdapter(getDatabaseCrendential())

    const logger = WinstonLoggerAdapter.init()

    const srv = new ExpressServerAdapter(SERVER_PORT, PREFIX, logger)

    await srv.start()
}

/* eslint-disable @typescript-eslint/no-floating-promises */
startAuthService()
