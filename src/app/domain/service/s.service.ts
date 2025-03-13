import { type Mask } from '../models/props.model'

export class MaskValidationService {
    static create(mask: string, value: string): Mask {
        if (!this.isValidMask(mask)) {
            throw new Error('Formato de máscara incorrecto')
        }

        if (!this.validateValue(mask, value)) {
            throw new Error(
                `El valor "${value}" no cumple con la máscara "${mask}"`
            )
        }

        return mask
    }

    private static isValidMask(value: string): value is Mask {
        return /^[ULF]+$/.test(value) // Solo permite "U", "L" y "F"
    }

    private static validateValue(mask: string, value: string): boolean {
        if (mask.length !== value.length) return false // Longitudes deben coincidir

        for (let i = 0; i < mask.length; i++) {
            const maskChar = mask[i]
            const valueChar = value[i]

            if (maskChar === 'U' && !/[A-Za-z0-9]/.test(valueChar)) return false
            if (maskChar === 'L' && !/[A-Za-z]/.test(valueChar)) return false
            if (maskChar === 'F' && !/[0-9]/.test(valueChar)) return false
        }

        return true
    }
}
