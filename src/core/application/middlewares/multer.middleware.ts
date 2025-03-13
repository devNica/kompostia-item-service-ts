import { type Request } from 'express'
import multer from 'multer'
import { RequestValidationErrorPresenter } from '../presenters/request-validation.presenter'

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage()

// Función para validar los tipos de archivo permitidos
const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true) // Aceptar el archivo
    } else {
        cb(
            new RequestValidationErrorPresenter(
                'Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG y GIF.'
            )
        )
    }
}

// Crear un middleware de multer con la configuración de almacenamiento en memoria
export const uploadFilesMiddleware = multer({
    fileFilter,
    storage,
    limits: {
        fieldSize: 5 * 1024 * 1024, // 5mb
    },
})
