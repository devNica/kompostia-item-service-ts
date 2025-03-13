import { type LoggerPort } from '@core/application/ports/logger.port'
import constants from '@core/shared/constants'
import { createLogger, type Logger } from 'winston'
import {
    loggerOnDevelopment,
    loggerOnProduction,
} from './config/winston-logger.config'

export class WinstonLoggerAdapter implements LoggerPort {
    private static instance: WinstonLoggerAdapter
    private readonly logger: Logger

    private constructor() {
        const options =
            constants.NODE_ENV === 'development'
                ? loggerOnDevelopment
                : loggerOnProduction
        this.logger = createLogger(options)
    }

    static init(): WinstonLoggerAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!WinstonLoggerAdapter.instance) {
            WinstonLoggerAdapter.instance = new WinstonLoggerAdapter()
        }

        return WinstonLoggerAdapter.instance
    }

    LogInfo(message: string): void {
        this.logger.info(message)
    }

    LogError(message: string): void {
        this.logger.error(message)
    }
}
