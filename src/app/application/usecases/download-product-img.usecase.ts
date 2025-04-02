import { type ItemFileRepositoryPort } from '../ports/repositories/item-file.repository'
import {
    type DownloadCtgImageI,
    type CtgItemImageDTO,
} from '../ports/usecases/catalog-item.usecase.port'

export class DownloadCtgImageUseCase implements DownloadCtgImageI {
    constructor(private readonly repository: ItemFileRepositoryPort) {}

    async run(data: { fileId: string }): Promise<CtgItemImageDTO> {
        const imageFound = await this.repository.getImageById(data.fileId)

        return {
            binary: imageFound.binary,
            filesize: imageFound.filesize,
            filetype: imageFound.filetype,
        }
    }
}
