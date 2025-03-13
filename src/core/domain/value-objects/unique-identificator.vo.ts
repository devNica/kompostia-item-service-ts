import crypto from 'crypto'

export class UniqueIdentificatorVO {
    readonly _value: string

    constructor(id?: string) {
        this._value = id ?? crypto.randomUUID()
    }

    public equals(id?: UniqueIdentificatorVO): boolean {
        if (!id) return false
        return this._value === id._value
    }
}
