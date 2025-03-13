export interface DatabaseCredentialModel {
    DB_SCHEMA: string
    DB_NAME: string
    DB_PASSWORD: string
    DB_USER: string
    DB_HOST: string | 'localhost'
    DB_DIALECT: 'mysql' | 'postgres' | 'mssql'
}
