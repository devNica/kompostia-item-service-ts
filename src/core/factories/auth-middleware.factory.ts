import { IsAuthenticatedMiddleware } from '@core/application/middlewares/is-auth.middleware'
import { jsonWebToken } from '@core/infrastructure/jwt/token-security-adapter'

function factory() {
    return new IsAuthenticatedMiddleware(jsonWebToken)
}

export const authMiddlewareFactory = factory()
