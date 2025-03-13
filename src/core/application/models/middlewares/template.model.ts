import { type DoubleCsrfUtilities } from 'csrf-csrf'

export interface RenderTemplate {
    path: string
    csrfToken: Pick<DoubleCsrfUtilities, 'generateToken'>
}
