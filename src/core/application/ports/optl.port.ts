export interface TracePayload {
    eventId: string
    eventType: string
    exchangeName: string
    carrier: Record<string, any>
    message: string
}

export interface OPTLServicePort {
    addTrace: (data: TracePayload) => Promise<void>
}
