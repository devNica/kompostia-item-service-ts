import { NodeSDK } from '@opentelemetry/sdk-node'
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
//  import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { Resource } from '@opentelemetry/resources'
// import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import constants from '@core/shared/constants'

const { SEMANTIC_CONVENTIONS, NODE_ENV } = constants

// 📌 Exportador OTLP (puede integrarse con Jaeger, Tempo, Grafana, etc.)
const traceExporter = new OTLPTraceExporter({
    url: constants.OTLP_TRACES_ENDPOINT, // 📌 Cambio a OTLP HTTP
})

// const metricExporter = new OTLPMetricExporter({
//     url: constants.OTLP_METRICS_ENDPOINT
// })

// 📌 Configuración de recursos (Servicio, Entorno, etc.)
const resource = new Resource({
    [SEMANTIC_CONVENTIONS.SERVICE_NAME]: 'gnosys-srv',
    [SEMANTIC_CONVENTIONS.SERVICE_VERSION]: '1.0.0',
    [SEMANTIC_CONVENTIONS.DEPLOYMENT_ENV]: NODE_ENV,
})

// Configuracion de OpenTelemetry
export const sdk = new NodeSDK({
    resource,
    traceExporter,
    // metricReader: new PeriodicExportingMetricReader({
    //     exporter: metricExporter
    // }),
    // instrumentations: [getNodeAutoInstrumentations()], // Instrumentacion automatica
})

// Manejo de apagado seguro
process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => {
            console.log('Open telemetry apagado')
        })
        .catch(console.error)
})
