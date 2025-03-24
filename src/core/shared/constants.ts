import * as EnvConfig from './environments'

export default {
    ...EnvConfig,

    SERVER_PORT: Number(EnvConfig.SERVER_PORT),

    NODE_ENV: EnvConfig.NODE_ENV ?? 'development',

    PREFIX: 'kompostia/srv/v1',

    SYSTEM_CURRENCY: EnvConfig.SYSTEM_CURRENCY ?? 'USD',

    INITIAL_PASSWORD_EXPIRATION_TIME: 5 * 60 * 1000, // 5 min
    PASSWORD_EXPIRATION_TIME: 90 * 24 * 60 * 60 * 1000,

    PAYPAL_BASEURL: 'https://api-m.sandbox.paypal.com',

    STORAGES: {
        ACCOUNT_RECOVERY: 'accountRecovery',
    },

    EVENTS: {
        MAILER_EVENT: 'sendMail',
        SMS_EVENT: 'sendSMS',
    },

    FORCED_RETRIES: 3,
    TAX_RATE: 15,
    SYSTEM_DECIMAL_PLACES: 2,
    ENABLE_FAKE_ERRORS: 3,

    SEMANTIC_CONVENTIONS: {
        SERVICE_NAME: 'service.name',
        SERVICE_VERSION: 'service.version',
        DEPLOYMENT_ENV: 'deployment.environment',
    },
}
