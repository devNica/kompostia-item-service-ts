export function getObjetcKeyPath(obj: any, searchKey: string): string {
    if (typeof obj !== 'object' || obj === null) {
        return ''
    }

    const keys = Object.keys(obj)
    const values: string[] = []

    if (searchKey in obj) {
        values.push(obj[searchKey])
    }

    keys.forEach((key) => {
        const nestedValue = getObjetcKeyPath(obj[key], searchKey)
        if (nestedValue) {
            values.push(nestedValue)
        }
    })

    return values.join('|')
}

export function findDeepestId(
    obj: any,
    { filterKey = 'id', depth = 0 }: { filterKey: string; depth: number }
): [string, number] {
    if (typeof obj !== 'object' || obj === null) {
        return ['', -1] // Profundidad -1 para evitar contar valores no válidos
    }

    let deepestId = ''
    let maxDepth = depth

    for (const key of Object.keys(obj)) {
        if (
            key.toLowerCase().includes(filterKey.toLowerCase()) &&
            typeof obj[key] === 'string'
        ) {
            deepestId = obj[key]
            maxDepth = depth
        }

        const [nestedId, nestedDepth] = findDeepestId(obj[key], {
            filterKey,
            depth: depth + 1,
        })

        if (nestedDepth > maxDepth) {
            deepestId = nestedId
            maxDepth = nestedDepth
        }
    }

    return [deepestId, maxDepth]
}

export const unwrapData = (data: any): any => {
    const r = JSON.stringify(data, null, 2)
    return JSON.parse(r)
}
