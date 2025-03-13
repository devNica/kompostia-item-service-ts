import {
    type CreateOrderResponse,
    type PaypalCreateOrderFailed,
    type PaypalCreateOrderResponse,
    type PaypalOrderPayload,
    type PaypalPort,
} from '@core/application/ports/paypal.port'
import constants from '@core/shared/constants'
import axios, { type AxiosResponse } from 'axios'

interface PaypalParameters {
    clientId: string
    clientSecret: string
    baseUrl: string
}

class PayPalAdapter implements PaypalPort {
    private static instance: PayPalAdapter
    private readonly clientId: string
    private readonly clientSecret: string
    private readonly baseUrl: string

    private constructor(_parameters: PaypalParameters) {
        this.clientId = _parameters.clientId
        this.clientSecret = _parameters.clientSecret
        this.baseUrl = _parameters.baseUrl
    }

    static init(parameters: PaypalParameters): PayPalAdapter {
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        if (!PayPalAdapter.instance) {
            PayPalAdapter.instance = new PayPalAdapter(parameters)
        }

        return PayPalAdapter.instance
    }

    private async getAccessToken(): Promise<string> {
        const response: AxiosResponse<{ access_token: string }> =
            await axios.post(
                `${this.baseUrl}/v1/oauth2/token`,
                'grant_type=client_credentials',
                {
                    auth: {
                        username: this.clientId,
                        password: this.clientSecret,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
        return response.data.access_token
    }

    private verifyOperation(
        response: AxiosResponse<
            PaypalCreateOrderResponse | PaypalCreateOrderFailed
        >
    ): CreateOrderResponse {
        if (response.status === 422) {
            const result = response.data as PaypalCreateOrderFailed

            return {
                message: result.details[0].description,
                status: false,
                link: result.links[0].href,
            }
        }

        const result = response.data as PaypalCreateOrderResponse

        return {
            message: 'Success',
            status: true,
            link: result.links.find((e) => e.rel === 'approve')?.href,
        }
    }

    async createOrder(
        payload: PaypalOrderPayload
    ): Promise<CreateOrderResponse> {
        const token = await this.getAccessToken()

        const response: AxiosResponse<
            PaypalCreateOrderResponse | PaypalCreateOrderFailed
        > = await axios.post(
            `${this.baseUrl}/v2/checkout/orders`,
            {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: payload.currency,
                            value: payload.amount,
                        },
                        description: payload.description,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return this.verifyOperation(response)
    }
}

export const paypalAdapter = PayPalAdapter.init({
    baseUrl: constants.PAYPAL_BASEURL,
    clientId: constants.PAYPAL_CLIENT_ID,
    clientSecret: constants.PAYPAL_SECRET,
})
