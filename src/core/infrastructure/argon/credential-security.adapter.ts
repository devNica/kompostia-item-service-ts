import argon from 'argon2'
import { type CredentialsHandlerPort } from '@core/application/ports/credentials-handler.port'

export class CredentialSecurityAdapter implements CredentialsHandlerPort {
    private static instance: CredentialSecurityAdapter

    private constructor() {}

    static init(): CredentialSecurityAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!CredentialSecurityAdapter.instance) {
            CredentialSecurityAdapter.instance = new CredentialSecurityAdapter()
        }

        return CredentialSecurityAdapter.instance
    }

    async passwordEncrypt(password: string): Promise<string> {
        return await argon.hash(password)
    }

    async comparePassword(
        passwordHash: string,
        password: string
    ): Promise<boolean> {
        return await argon.verify(passwordHash, password)
    }
}
