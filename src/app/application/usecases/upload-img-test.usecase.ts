import { type FileModel } from '@core/application/models/files/file.model'
import { type UploadImageTestI } from '../ports/usecases/test.usecase'

export class UploadImageTestUseCase implements UploadImageTestI {
    async run(data: FileModel[]): Promise<void> {
        console.log(data)
    }
}
