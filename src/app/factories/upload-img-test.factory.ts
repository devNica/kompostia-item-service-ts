import { UploadImageTestController } from '@app/application/controllers/upload-img-test.controller'
import { UploadImageTestUseCase } from '@app/application/usecases/upload-img-test.usecase'
import { type EmptyResponseModel } from '@core/application/models/app/app.model'
import { type FileModel } from '@core/application/models/files/file.model'
import { type ControllerPort } from '@core/application/ports/controller.port'
import { SuccessRequestPresenter } from '@core/application/presenters/success-request.presenter'

function factory(): ControllerPort<
    EmptyResponseModel,
    {
        files: FileModel[]
    }
> {
    const usecase = new UploadImageTestUseCase()

    const presenter = new SuccessRequestPresenter<EmptyResponseModel>()

    return new UploadImageTestController(usecase, presenter)
}

export const uploadImgTestFactory = factory()
