export interface PaypalOrderPayload {
    amount: string
    currency: string
    description: string
}

interface Link {
    href: string
    rel: 'self' | 'approve' | 'update' | 'capture'
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
}

export interface PaypalCreateOrderResponse {
    id: string
    status: 'CREATED'
    links: Link[]
}

export interface PaypalCreateOrderFailed {
    name: 'UNPROCESSABLE_ENTITY'
    details: Array<{
        issue: 'CURRENCY_NOT_SUPPORTED'
        links: []
        description: string
    }>

    message: string
    debug_id: string
    links: Link[]
}

export interface CreateOrderResponse {
    status: boolean
    message: string
    link?: string
}

export interface PaypalPort {
    createOrder: (payload: PaypalOrderPayload) => Promise<CreateOrderResponse>
}
