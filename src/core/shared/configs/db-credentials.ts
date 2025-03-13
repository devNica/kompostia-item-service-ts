import { type DatabaseCredentialModel } from '@core/application/models/db/database-credential.model'
import constants from '../constants'

export function getDatabaseCrendential(): DatabaseCredentialModel {
    if (constants.NODE_ENV === 'development') {
        return {
            DB_SCHEMA: constants.DB_SCHEMA_DEV,
            DB_NAME: constants.DB_NAME_DEV,
            DB_USER: constants.DB_USER_DEV,
            DB_PASSWORD: constants.DB_PASSWORD_DEV,
            DB_HOST: constants.DB_HOST_DEV,
            DB_DIALECT: constants.DB_DIALECT_DEV,
        }
    } else if (constants.NODE_ENV === 'production') {
        return {
            DB_SCHEMA: constants.DB_SCHEMA_PROD,
            DB_NAME: constants.DB_NAME_PROD,
            DB_USER: constants.DB_USER_PROD,
            DB_PASSWORD: constants.DB_PASSWORD_PROD,
            DB_HOST: constants.DB_HOST_PROD,
            DB_DIALECT: constants.DB_DIALECT_PROD,
        }
    } else {
        return {
            DB_SCHEMA: constants.DB_SCHEMA_TEST,
            DB_NAME: constants.DB_NAME_TEST,
            DB_USER: constants.DB_USER_TEST,
            DB_PASSWORD: constants.DB_PASSWORD_TEST,
            DB_HOST: constants.DB_HOST_TEST,
            DB_DIALECT: constants.DB_DIALECT_TEST,
        }
    }
}
