export interface EncryptionPort<T> {
    encrypt: (data: T, key: string) => string
    decryprt: (hash: string, key: string) => T
}
