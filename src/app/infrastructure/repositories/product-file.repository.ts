import { ItemFileRepositoryPort } from '@app/application/ports/repositories/item-file.repository'
import { type ProductImgRaw } from '@app/domain/entities/product-img.entity'
import { InternalServerErrorPresenter } from '@core/application/presenters/internal-server-error.presenter'
import { KomposeModels } from '@devnica/kompostia-models-ts'

class ItemFileRepository implements ItemFileRepositoryPort {
    async getImageById(fileId: string): Promise<ProductImgRaw> {
        try {
            const file = await KomposeModels.FileModel.findByPk(fileId)

            if (!file) throw new Error('Imagen de producto no encontrada')

            return {
                binary: file.binary,
                filesize: file.filesize,
                filetype: file.filetype,
                fileId: file.id,
            }
        } catch (error) {
            throw new InternalServerErrorPresenter(String(error))
        }
    }
}

export const itemFileRepositoryImpl = new ItemFileRepository()
