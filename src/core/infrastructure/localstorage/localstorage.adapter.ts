import { LocalStorage } from 'node-localstorage'
import { type CachePort } from '@core/application/ports/cache.port'
import path from 'path'

class LocalStorageAdapter implements CachePort {
    private static instance: LocalStorageAdapter
    private readonly localStorageClient: LocalStorage

    private constructor(_path: string) {
        this.localStorageClient = new LocalStorage(_path)
    }

    static init(path: string): LocalStorageAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!LocalStorageAdapter.instance) {
            LocalStorageAdapter.instance = new LocalStorageAdapter(path)
        }

        return LocalStorageAdapter.instance
    }

    async createStore(key: string): Promise<void> {
        const result = await this.get(key)
        if (!result || (Array.isArray(result) && result.length === 0)) {
            this.set(key, '[]')
        }
    }

    async get(key: string): Promise<string | null> {
        return this.localStorageClient.getItem(key)
    }

    async set(key: string, payload: string): Promise<void> {
        this.localStorageClient.setItem(key, payload)
    }

    async del(key: string): Promise<void> {
        this.localStorageClient.setItem(key, '[]')
    }
}

const storedFilesPath = path.join(process.cwd(), 'src/persistence')

export const localStorageAdapter = LocalStorageAdapter.init(storedFilesPath)
