import { type BrokerPort } from '@core/application/ports/broker.port'
import constants from '@core/shared/constants'
import amqplib, { type Connection } from 'amqplib'

class RabbitMQAdapter implements BrokerPort {
    private static instance: RabbitMQAdapter

    private constructor(private readonly url: string) {}

    public static newInstance(url: string): RabbitMQAdapter {
        if (!RabbitMQAdapter.instance) {
            RabbitMQAdapter.instance = new RabbitMQAdapter(url)
        }

        return RabbitMQAdapter.instance
    }

    async connection(): Promise<Connection> {
        try {
            return await amqplib.connect(this.url)
        } catch (error) {
            throw new Error('Error de conexion a RabbitMQ')
        }
    }
}

export const rabbitMQAdapter = RabbitMQAdapter.newInstance(
    constants.RABBITMQ_URL
)
