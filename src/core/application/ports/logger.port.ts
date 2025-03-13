export interface LoggerPort {
    LogInfo: (message: string) => void
    LogError: (message: string) => void
}
