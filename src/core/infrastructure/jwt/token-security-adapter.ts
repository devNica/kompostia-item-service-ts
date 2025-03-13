/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import constants from '@core/shared/constants'

import {
    type UserTokenPayload,
    type SignedSessionToken,
    type RecoveryPasswordPayload,
    type SignedCredentialRecoveryToken,
    type AccountRecoveryPayload,
    type SignedAccountRecoveryToken,
} from '@core/application/models/token/token'
import { type TokenHandlerPort } from '@core/application/ports/token-handler.port'
import { createFutureDate } from '@core/shared/utils/date'

export interface SecretPhrases {
    activeSession: string
    refreshSession: string
    passwordRecovery: string
    accountRecovery: string
}

class JsonWebTokenAdapter implements TokenHandlerPort {
    private readonly sessionExpirationTime = 600 // miliseconds
    private readonly refreshExpirationTime = 1800 // miliseconds
    private readonly recoveryExpirationTime = 300 // miliseconds

    constructor(private readonly phrases: SecretPhrases) {}

    signSessionToken(payload: UserTokenPayload): SignedSessionToken {
        const expirationDate = createFutureDate(
            new Date(),
            this.sessionExpirationTime
        )

        const token = jwt.sign(payload, this.phrases.activeSession, {
            expiresIn: this.sessionExpirationTime,
        })

        return {
            token,
            expirationDate,
        }
    }

    signSessionRefresToken(payload: UserTokenPayload): SignedSessionToken {
        const expirationDate = createFutureDate(
            new Date(),
            this.refreshExpirationTime
        )

        const token = jwt.sign(payload, this.phrases.refreshSession, {
            expiresIn: this.refreshExpirationTime,
        })

        return {
            token,
            expirationDate,
        }
    }

    signPasswordRecoveryToken(
        payload: RecoveryPasswordPayload
    ): SignedCredentialRecoveryToken {
        const expirationDate = createFutureDate(
            new Date(),
            this.recoveryExpirationTime
        )

        const token = jwt.sign(payload, this.phrases.passwordRecovery, {
            expiresIn: this.recoveryExpirationTime,
        })

        return {
            token,
            expirationDate,
        }
    }

    signAccountRecoveryToken(
        payload: AccountRecoveryPayload
    ): SignedAccountRecoveryToken {
        const expirationDate = createFutureDate(
            new Date(),
            this.recoveryExpirationTime
        )

        const token = jwt.sign(payload, this.phrases.accountRecovery, {
            expiresIn: this.recoveryExpirationTime,
        })

        return {
            token,
            expirationDate,
        }
    }

    verifyAccountRecoveryToken(
        jwtToken: string,
        phrase: keyof SecretPhrases
    ): AccountRecoveryPayload {
        return jwt.verify(
            jwtToken,
            this.phrases[phrase]
        ) as AccountRecoveryPayload
    }

    verifySessionTokens(
        jwtToken: string,
        phrase: keyof SecretPhrases
    ): UserTokenPayload {
        return jwt.verify(jwtToken, this.phrases[phrase]) as UserTokenPayload
    }

    verifyPasswordRecoveryToken(jwtToken: string): RecoveryPasswordPayload {
        return jwt.verify(
            jwtToken,
            this.phrases.passwordRecovery
        ) as RecoveryPasswordPayload
    }
}

const jwtSecretSession = constants.JWT_SECRET_SESSION
const jwtRefreshSession = constants.JWT_REFRESH_SESSION
const jwtPasswordRecovery = constants.JWT_PASSWORD_RECOVERY
const jwtAccountRecovery = constants.JWT_ACCOUNT_RECOVERY

export const jsonWebToken = new JsonWebTokenAdapter({
    activeSession: jwtSecretSession,
    refreshSession: jwtRefreshSession,
    passwordRecovery: jwtPasswordRecovery,
    accountRecovery: jwtAccountRecovery,
})
