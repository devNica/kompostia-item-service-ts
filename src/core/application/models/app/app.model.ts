export type EmptyResponseModel = Record<string, unknown>
export type EmptyRequestModel = Record<string, unknown>

export type AvailableLang = 'es' | 'en'

export interface MultiLangI {
    value: string
    lang: AvailableLang
}

export interface QueryParams {
    value: string
}
