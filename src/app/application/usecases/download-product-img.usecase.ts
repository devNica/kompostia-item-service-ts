import { type ProductFileRepositoryPort } from '../ports/repositories/product-file.repository'
import {
    type DownloadCtgImageI,
    type CtgItemImageDTO,
} from '../ports/usecases/catalog-item.usecase.port'

export class DownloadCtgImageUseCase implements DownloadCtgImageI {
    constructor(private readonly repository: ProductFileRepositoryPort) {}

    async run(data: { fileId: string }): Promise<CtgItemImageDTO> {
        const imageFound = await this.repository.getImageById(data.fileId)

        return {
            binary: imageFound.binary,
            filesize: imageFound.filesize,
            filetype: imageFound.filetype,
        }
    }
}
