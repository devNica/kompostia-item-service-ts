declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT: string
            NODE_ENV: 'development' | 'test' | 'production'

            DB_SCHEMA_PROD: string
            DB_NAME_PROD: string
            DB_USER_PROD: string
            DB_PASSWORD_PROD: string
            DB_HOST_PROD: string
            DB_DIALECT_PROD: 'mysql' | 'postgres' | 'mssql'

            DB_SCHEMA_DEV: string
            DB_NAME_DEV: string
            DB_USER_DEV: string
            DB_PASSWORD_DEV: string
            DB_HOST_DEV: string
            DB_DIALECT_DEV: 'mysql' | 'postgres' | 'mssql'

            DB_SCHEMA_TEST: string
            DB_NAME_TEST: string
            DB_USER_TEST: string
            DB_PASSWORD_TEST: string
            DB_HOST_TEST: string
            DB_DIALECT_TEST: 'mysql' | 'postgres' | 'mssql'

            JWT_SECRET_SESSION: string
            JWT_REFRESH_SESSION: string
            JWT_PASSWORD_RECOVERY: string
            JWT_ACCOUNT_RECOVERY: string
            JWT_ACCESS_EXPIRATION_TIME: string
            JWT_REFRESH_REFRESH_EXPIRATION_TIME: string

            RESEND_API_KEY: string

            VONAGE_API_KEY: string
            VONAGE_API_SECRET: string

            ADMIN_EMAIL: string
            ADMIN_SMS: string

            COOKIES_SECRET: string

            CSRF_SECRET: string

            ENCRYPTION_CONTRACT: string
            RECOVERY_ACCOUNT_SKEY: string

            PAYPAL_CLIENT_ID: string
            PAYPAL_SECRET: string

            EMAIL_TEST: string
            PHONE_TEST: string

            SYSTEM_CURRENCY: 'USD' | 'NIO' | 'MXN'

            RABBITMQ_URL: string
            EXCHANGE_NAME: string
            QUEUE_NAME: string
            DLQ_NAME: string

            OTLP_TRACES_ENDPOINT: string
            OTLP_METRICS_ENDPOINT: string

            TRACER_NAME: string
        }
    }
}

export {}
