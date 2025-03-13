export interface CredentialsHandlerPort {
    passwordEncrypt: (password: string) => Promise<string>
    comparePassword: (
        passwordHash: string,
        password: string
    ) => Promise<boolean>
}
