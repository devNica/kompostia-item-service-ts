import { type FileModel } from '@core/application/models/files/file.model'
import { type ProductImgRaw } from '../entities/product-img.entity'

export class ProductImgMappingService {
    static fileToProductImg(data: FileModel[]): ProductImgRaw[] {
        return data.map(
            (e): ProductImgRaw => ({
                binary: e.buffer ?? Buffer.from('', 'utf-8'),
                filesize: e.size,
                filetype: e.mimetype,
            })
        )
    }
}
