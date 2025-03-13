import { type SecretPhrases } from '@core/infrastructure/jwt/token-security-adapter'
import {
    type AccountRecoveryPayload,
    type SignedAccountRecoveryToken,
    type RecoveryPasswordPayload,
    type SignedCredentialRecoveryToken,
    type SignedSessionToken,
    type UserTokenPayload,
} from '../models/token/token'

export interface TokenHandlerPort {
    signSessionToken: (payload: UserTokenPayload) => SignedSessionToken
    signSessionRefresToken: (payload: UserTokenPayload) => SignedSessionToken
    signAccountRecoveryToken: (
        payload: AccountRecoveryPayload
    ) => SignedAccountRecoveryToken
    signPasswordRecoveryToken: (
        payload: RecoveryPasswordPayload
    ) => SignedCredentialRecoveryToken
    verifySessionTokens: (
        jwtToken: string,
        phrase: keyof SecretPhrases
    ) => UserTokenPayload
    verifyPasswordRecoveryToken: (jwtToken: string) => RecoveryPasswordPayload
    verifyAccountRecoveryToken: (
        jwtToken: string,
        phrase: keyof SecretPhrases
    ) => AccountRecoveryPayload
}
