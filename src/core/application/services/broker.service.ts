import constants from '@core/shared/constants'
import {
    type BrokerPayload,
    type BrokerPort,
    type BrokerServicePort,
} from '../ports/broker.port'
import { type OPTLServicePort } from '../ports/optl.port'
import { type Channel, type Connection } from 'amqplib'

const { EXCHANGE_NAME } = constants

export class BrokerService implements BrokerServicePort {
    private readonly prefix = {
        publish: '/publish',
    }

    private connection: Connection
    private channel: Channel

    constructor(
        private readonly brokerAdapter: BrokerPort,
        private readonly optlService: OPTLServicePort
    ) {}

    private async getChannel(): Promise<Channel> {
        if (!this.connection) {
            this.connection = await this.brokerAdapter.connection()
        }
        if (!this.channel) {
            this.channel = await this.connection.createChannel()
            await this.channel.assertExchange(EXCHANGE_NAME, 'fanout', {
                durable: true,
            })
        }
        return this.channel
    }

    async publish<T>(data: BrokerPayload<T>): Promise<void> {
        // Generar ID unico para el evento
        const eventId = crypto.randomUUID()

        const channel = await this.getChannel()

        // Crear el exchange (si no existe)
        await channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: true })

        const carrier: Record<string, any> = {
            eventId,
        }

        // Convertir el mensaje a un strign
        const message = JSON.stringify({
            eventType: data.eventType,
            meta: data.meta,
            eventId,
        })

        if (data.track) {
            // LLamar al Servicio para el Rastreo del Evento.
            await this.optlService.addTrace({
                eventId,
                eventType: `${this.prefix.publish}${data.eventType}`,
                carrier,
                exchangeName: EXCHANGE_NAME,
                message,
            })
        }

        // Publicar el evento
        channel.publish(EXCHANGE_NAME, '', Buffer.from(message), {
            headers: carrier,
        })
    }
}
