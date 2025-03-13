import { type EncryptionPort } from '@core/application/ports/crypto.port'

import { SHA256 } from 'crypto-js'
import crypto from 'crypto'
import constants from '@core/shared/constants'

const { ENCRYPTION_CONTRACT } = constants

export class DataEncryptionAdapter<T> implements EncryptionPort<T> {
    private readonly iv: Buffer = Buffer.alloc(16, 0)
    private readonly algorithm = 'aes-192-cbc'

    private generateEncryptionKey(key: string): Buffer {
        return crypto.scryptSync(
            SHA256(ENCRYPTION_CONTRACT, { key }).toString(),
            'salt',
            24
        )
    }

    encrypt(data: T, key: string): string {
        const ENCRYPTION_KEY = this.generateEncryptionKey(key)

        const cipher = crypto.createCipheriv(
            this.algorithm,
            ENCRYPTION_KEY,
            this.iv
        )

        let crypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')

        crypted += cipher.final('hex')
        return crypted
    }

    decryprt(hash: string, key: string): T {
        const ENCRYPTION_KEY = this.generateEncryptionKey(key)

        const deciper = crypto.createDecipheriv(
            this.algorithm,
            ENCRYPTION_KEY,
            this.iv
        )

        let decrypt = deciper.update(hash, 'hex', 'utf8')

        decrypt += deciper.final('utf8')

        return JSON.parse(decrypt) as T
    }
}
