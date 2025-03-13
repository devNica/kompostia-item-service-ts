export interface ErrorHandlerPort {
    statusCode: number
    messages?: string[]
    name?: string
    stack?: Error['stack']
}
