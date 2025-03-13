import { type CachePort } from '@core/application/ports/cache.port'
import Redis from 'ioredis'

export interface RedisConfig {
    host: string
    password: string
    port: number
}

class RedisAdapter implements CachePort {
    private static instance: RedisAdapter
    private readonly redisClient: Redis

    private constructor(_credentials: RedisConfig) {
        this.redisClient = new Redis(_credentials)
    }

    static init(credentials: RedisConfig): RedisAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!RedisAdapter.instance) {
            RedisAdapter.instance = new RedisAdapter(credentials)
        }

        return RedisAdapter.instance
    }

    async get(key: string): Promise<any> {
        return await new Promise((resolve, reject) => {
            void this.redisClient.get(key, (err, result) => {
                if (err !== null) reject(err)
                else resolve(result)
            })
        })
    }

    async set(key: string, payload: string): Promise<void> {
        await new Promise((resolve, reject) => {
            void this.redisClient.set(key, payload, (err) => {
                if (err !== null) reject(err)
                else resolve('')
            })
        })
    }

    async del(key: string): Promise<void> {
        await new Promise((resolve, reject) => {
            void this.redisClient.del(key, (err) => {
                if (err !== null) reject(err)
                else resolve('')
            })
        })
    }
}

export const redisAdapter = RedisAdapter.init({
    host: '',
    password: '',
    port: 78,
})
