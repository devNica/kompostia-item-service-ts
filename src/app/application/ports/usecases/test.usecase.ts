import { type FileModel } from '@core/application/models/files/file.model'

export interface UploadImageTestI {
    run: (data: FileModel[]) => Promise<void>
}
