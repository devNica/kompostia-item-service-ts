import {
    type CachePort,
    type CacheServicePort,
    type SearchAndFilterParameters,
} from '../ports/cache.port'

export class CacheService<T> implements CacheServicePort<T> {
    constructor(private readonly cacheAdapter: CachePort) {}

    async createStore(storeName: string, payload: T): Promise<void> {
        await this.cacheAdapter.set(storeName, JSON.stringify([payload]))
    }

    async getAndFilterLastStoredItem(
        data: SearchAndFilterParameters<T>
    ): Promise<T> {
        const result = await this.getStoreByName(data.storeName)

        const filtered = data.type
            ? result.filter(
                  (item) => item[data.keyToFilter] === data.valueToFilter
              )
            : result.filter(
                  (item) => item[data.keyToFilter] !== data.valueToFilter
              )

        return filtered.reverse()[0]
    }

    async getLastItemInStorage(storeName: string): Promise<T> {
        const result = await this.getStoreByName(storeName)
        return result.reverse()[0]
    }

    async getAndFilterStoreByParams(
        data: SearchAndFilterParameters<T>
    ): Promise<T[]> {
        const result = await this.getStoreByName(data.storeName)

        return data.type
            ? result.filter(
                  (item) => item[data.keyToFilter] === data.valueToFilter
              )
            : result.filter(
                  (item) => item[data.keyToFilter] !== data.valueToFilter
              )
    }

    async getStoreByName(storeName: string): Promise<T[]> {
        const result = await this.cacheAdapter.get(storeName)
        return JSON.parse(result ?? '[]')
    }

    async rewriteStoreByName(storeName: string, payload: T[]): Promise<void> {
        await this.cacheAdapter.set(storeName, JSON.stringify(payload))
    }

    async updateStoreByName(
        data: SearchAndFilterParameters<T>,
        payload: T
    ): Promise<void> {
        const rest = await this.getAndFilterStoreByParams({ ...data, type: 0 })
        this.rewriteStoreByName(data.storeName, [...rest, payload])
    }
}
