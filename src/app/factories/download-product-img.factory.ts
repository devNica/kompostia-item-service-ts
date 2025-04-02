import { DownloadCtgImageController } from '@app/application/controllers/download-product-img.controller'
import { DownloadCtgImageUseCase } from '@app/application/usecases/download-product-img.usecase'
import { itemFileRepositoryImpl } from '@app/infrastructure/repositories/product-file.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'

function factory(): ControllerPort {
    const usecase = new DownloadCtgImageUseCase(itemFileRepositoryImpl)
    return new DownloadCtgImageController(usecase)
}

export const downloadProductImageFactory = factory()
