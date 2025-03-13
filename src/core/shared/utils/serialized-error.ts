import { type JoiErrorDetailsModel } from '@core/application/models/validators/joi'

export const serializedErrorStack = (stack: JoiErrorDetailsModel[]): string => {
    return stack.map((e) => e.message).join(', ')
}

export const createDelay = async (ms: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, ms))
}
