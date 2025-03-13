import express, { type Application } from 'express'
import { engine as hbs } from 'express-handlebars'
import path from 'path'

export async function expressTemplateEngine(app: Application): Promise<void> {
    app.engine('hbs', hbs({ defaultLayout: 'base', extname: '.hbs' }))
    app.set('view engine', 'hbs')
    app.set('views', process.cwd() + '/src/core/infrastructure/views')

    // Configuración para servir archivos estáticos
    const staticFilesPath = path.join(
        process.cwd(),
        'src/core/infrastructure/views'
    )
    app.use('/static', express.static(staticFilesPath))
}
