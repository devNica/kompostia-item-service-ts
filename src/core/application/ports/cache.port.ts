export interface SearchAndFilterParameters<T> {
    storeName: string // Nombre del Almacen
    keyToFilter: keyof T // Clave a Filtrar
    valueToFilter: string | number // Valor del Filtro
    type?: 1 | 0 // 1 (Incluyente) || 0 (Excluyente)
}

export interface CacheServicePort<T> {
    createStore: (storeName: string, payload: T) => Promise<void>
    getStoreByName: (storeName: string) => Promise<T[]>
    getAndFilterStoreByParams: (
        data: SearchAndFilterParameters<T>
    ) => Promise<T[]>
    getAndFilterLastStoredItem: (
        data: SearchAndFilterParameters<T>
    ) => Promise<T>
    getLastItemInStorage: (storeName: string) => Promise<T>
    rewriteStoreByName: (storeName: string, payload: T[]) => Promise<void>
    updateStoreByName: (
        data: SearchAndFilterParameters<T>,
        payload: T
    ) => Promise<void>
}

export interface CachePort {
    get: (key: string) => Promise<string | null>
    set: (key: string, payload: string) => Promise<void>
    del: (key: string) => Promise<void>
}
