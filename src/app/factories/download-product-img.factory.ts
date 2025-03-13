import { DownloadCtgImageController } from '@app/application/controllers/download-product-img.controller'
import { DownloadCtgImageUseCase } from '@app/application/usecases/download-product-img.usecase'
import { productFileRepositoryImpl } from '@app/infrastructure/repositories/product-file.repository'
import { type ControllerPort } from '@core/application/ports/controller.port'

function factory(): ControllerPort {
    const usecase = new DownloadCtgImageUseCase(productFileRepositoryImpl)
    return new DownloadCtgImageController(usecase)
}

export const downloadProductImageFactory = factory()
