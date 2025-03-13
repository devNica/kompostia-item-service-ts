import { type Connection } from 'amqplib'

export interface BrokerPayload<T> {
    meta: T
    eventType: string
    track: boolean
}

export interface BrokerPort {
    connection: () => Promise<Connection>
}

export interface BrokerServicePort {
    publish: <T>(data: BrokerPayload<T>) => Promise<void>
}
