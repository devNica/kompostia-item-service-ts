export type Char = 'U' | 'L' | 'F'

export type Mask<T extends string = ''> =
    T extends `${infer First}${infer Rest}`
        ? First extends Char
            ? Mask<Rest>
            : never
        : T
