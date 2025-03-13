import { KomposeConn } from '@devnica/kompostia-models-ts'
import { type DatabaseCredentialModel } from '@core/application/models/db/database-credential.model'

export async function dbConnectionAdapter(
    credentials: DatabaseCredentialModel
): Promise<KomposeConn.IDatabaseOrchestrator> {
    const db = KomposeConn.DatabaseOrchestratror.new()

    const conn = {
        database: credentials.DB_NAME,
        host: credentials.DB_HOST,
        password: credentials.DB_PASSWORD,
        user: credentials.DB_USER,
        schema: credentials.DB_SCHEMA,
        logging: false,
    }

    try {
        await db.initialize(conn, false)

        return db
    } catch (error) {
        throw new Error(String(error))
    }
}
