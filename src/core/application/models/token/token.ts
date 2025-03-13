export interface TokenModel {
    userId: string
    token: string
    expiresIn: string
}

/** payloads  */
export interface UserTokenPayload {
    userId: string
    roles: string[]
}

export interface RecoveryPasswordPayload {
    userId: string
}

export interface AccountRecoveryPayload {
    userId: string
    hash: string
}

/** signeds  */

interface SignatureBaseModel {
    token: string
    expirationDate: Date
}

export type SignedSessionToken = SignatureBaseModel

export type SignedCredentialRecoveryToken = SignatureBaseModel

export type SignedAccountRecoveryToken = SignatureBaseModel

/** verified  */
export type VerifiedTokenModel = UserTokenPayload | RecoveryPasswordPayload
