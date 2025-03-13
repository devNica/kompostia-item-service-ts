import { type MaskVO } from './mask.vo'

export class SKUVO {
    private constructor(private readonly _value: string) {}

    // Recibe una mascara ya validada y el sku definido
    static create(mask: MaskVO, value: string): SKUVO {
        const [_, sku] = value.split('-')

        if (sku.length !== mask.value.length) {
            throw new Error(
                'Las longitudes de la mascara y del identificador del SKU deben coincidir'
            )
        }

        if (!this.validateValue(mask.value, sku)) {
            throw new Error(
                `El valor "${sku}" no cumple con la máscara "${mask.value}"`
            )
        }

        return new SKUVO(value)
    }

    private static validateValue(mask: string, value: string): boolean {
        for (let i = 0; i < mask.length; i++) {
            const maskChar = mask[i]
            const valueChar = value[i]

            if (maskChar === 'U' && !/[A-Za-z0-9]/.test(valueChar)) return false
            if (maskChar === 'L' && !/[A-Za-z]/.test(valueChar)) return false
            if (maskChar === 'F' && !/[0-9]/.test(valueChar)) return false
        }

        return true
    }

    get value(): string {
        return this._value
    }
}
