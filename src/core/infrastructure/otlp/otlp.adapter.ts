import { NodeSDK } from '@opentelemetry/sdk-node'
import { Resource } from '@opentelemetry/resources'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import constants from '@core/shared/constants'

const { SEMANTIC_CONVENTIONS, NODE_ENV } = constants

export class OpenTelemetryAdapter {
    private static instance: OpenTelemetryAdapter

    private constructor(private readonly telemetry: NodeSDK) {}

    public static newInstance(): OpenTelemetryAdapter {
        if (!OpenTelemetryAdapter.instance) {
            // 📌 Exportador OTLP
            const traceExporter = new OTLPTraceExporter({
                // 📌 OTLP-HTTP
                url: constants.OTLP_TRACES_ENDPOINT,
            })

            const resource = new Resource({
                [SEMANTIC_CONVENTIONS.SERVICE_NAME]: 'gnosys-srv',
                [SEMANTIC_CONVENTIONS.SERVICE_VERSION]: '1.0.0',
                [SEMANTIC_CONVENTIONS.DEPLOYMENT_ENV]: NODE_ENV,
            })

            OpenTelemetryAdapter.instance = new OpenTelemetryAdapter(
                new NodeSDK({
                    resource,
                    traceExporter,
                    instrumentations: [getNodeAutoInstrumentations()],
                })
            )
        }

        return OpenTelemetryAdapter.instance
    }

    async start(): Promise<void> {
        try {
            this.telemetry.start()
        } catch (error) {
            console.log(error)
        }
    }
}
