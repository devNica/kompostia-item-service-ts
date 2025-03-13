export type MimeTypes =
    | 'image/jpeg'
    | 'image/jpg'
    | 'image/png'
    | 'text/html'
    | 'application/pdf'

export interface FileModel {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: MimeTypes
    size: number
    filename?: string
    buffer?: Buffer
}
