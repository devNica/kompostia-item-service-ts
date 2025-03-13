import constants from '@core/shared/constants'
import { context, propagation, trace } from '@opentelemetry/api'
import { type OPTLServicePort, type TracePayload } from '../ports/optl.port'

class OpenTelemetryService implements OPTLServicePort {
    async addTrace(data: TracePayload): Promise<void> {
        propagation.inject(context.active(), data.carrier)

        // 📌 Obtener el tracer de OpenTelemetry
        const tracer = trace.getTracer(constants.TRACER_NAME)

        // Iniciar un Span para rastrear el evento
        await tracer.startActiveSpan(data.eventType, async (span) => {
            try {
                // Añadir atributos al span
                span.setAttributes({
                    'event.id': data.eventId,
                    'event.type': data.eventType,
                    microservice: 'product-ms',
                    'rabbitmq.exchange': data.exchangeName,
                    'rabbitmq.routingKey': '',
                })
                span.addEvent(data.message)
            } catch (error) {
                console.error('❌ Error publicando evento:', error)
                span.recordException(String(error))
                span.setStatus({ code: 2, message: 'Error publicando evento' }) // `2` es el código de error en OpenTelemetry
                setTimeout(() => {
                    span.end()
                }, 50)
            } finally {
                // Cerrar la conexión después de un tiempo
                setTimeout(() => {
                    span.end() // 📌 Finalizar el span después de cerrar la conexión
                }, 50)
            }
        })
    }
}

export const optlServiceImpl = new OpenTelemetryService()
