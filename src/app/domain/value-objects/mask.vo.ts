import { type Mask } from '../models/props.model'

export class MaskVO {
    private constructor(private readonly _mask: Mask) {}

    static create(mask: string): MaskVO {
        if (!this.isValidMask(mask)) {
            throw new Error('El formato de mascara es incorrecto')
        }

        return new MaskVO(mask as Mask)
    }

    private static isValidMask(value: string): value is Mask {
        return /^[ULF]+$/.test(value) // Solo permite "U", "L" y "F"
    }

    get value(): string {
        return this._mask
    }
}
