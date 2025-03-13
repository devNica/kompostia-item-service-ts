import constants from '@core/shared/constants'
import amqplib from 'amqplib'
import { trace } from '@opentelemetry/api'

export const publishEvent = async <T>(eventType: string, payload: T) => {
    // 📌 Obtener el tracer de OpenTelemetry
    const tracer = trace.getTracer('gnosys-srv')

    // Iniciar un Span para rastrear el evento

    await tracer.startActiveSpan(
        `/product-ms-event/${eventType}`,
        async (span) => {
            try {
                // conectarse a RabbitMQ
                const connection = await amqplib.connect(constants.RABBITMQ_URL)
                const channel = await connection.createChannel()

                // Crear el exchange (si no existe)
                await channel.assertExchange(
                    constants.EXCHANGE_NAME,
                    'fanout',
                    { durable: true }
                )

                // Convertir el mensaje a un strign
                const message = JSON.stringify({ eventType, payload })
                // Publicar el evento
                channel.publish(
                    constants.EXCHANGE_NAME,
                    '',
                    Buffer.from(message)
                )

                // Añadir atributos al span
                span.setAttribute('rabbitmq.exchange', constants.EXCHANGE_NAME)
                span.setAttribute('rabbitmq.eventType', eventType)
                span.setAttribute('rabbitmq.routingKey', '') // En `fanout` no hay routing key
                span.addEvent(message)

                // Cerrar la conexión después de un tiempo
                setTimeout(() => {
                    connection.close()
                    span.end() // 📌 Finalizar el span después de cerrar la conexión
                }, 500)
            } catch (error) {
                console.error('❌ Error publicando evento:', error)
                span.recordException(String(error))
                span.setStatus({ code: 2, message: 'Error publicando evento' }) // `2` es el código de error en OpenTelemetry
                span.end()
            }
        }
    )

    // try {
    //     // conectarse a RabbitMQ
    //     const connection = await amqplib.connect(constants.RABBITMQ_URL)
    //     const channel = await connection.createChannel()

    //     // Crear el exchange (si no existe)
    //     await channel.assertExchange(constants.EXCHANGE_NAME, 'fanout', { durable: true })

    //     // Convertir el mensaje a un strign
    //     const message = JSON.stringify({ eventType, payload })
    //     // Publicar el evento
    //     channel.publish(constants.EXCHANGE_NAME, "", Buffer.from(message))

    //     console.log(`📤 Evento enviado: ${eventType}`)

    //     // Cerrar la conexion despues de un tiempo
    //     setTimeout(() => {
    //         connection.close()
    //     }, 500);

    // } catch (error) {
    //     console.error("Error publicando evento:", error)
    // }
}
