import { type Multer } from 'multer'

export interface ImgFileProps {
    filename: string
    filesize: number
    filetype: string
    binary: Buffer
}

export class ImgFileVO {
    private constructor(private readonly props: ImgFileProps) {}

    static create(data: Multer): void {}
}
