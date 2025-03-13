import { hasRequiredKey } from '@core/shared/utils/validator'
import { type HttpRequestMiddlewareModel } from '../models/middlewares/http-request'
import { type MiddlewarePort } from '../ports/middleware.port'
import { UnAuthorizedRequestErrorPresenter } from '../presenters/unauthorized-req-error.presenter'
import { ForbiddenRequestErrorPresenter } from '../presenters/forbidden-req-error.presenter'
import { type TokenHandlerPort } from '../ports/token-handler.port'
import { type UserTokenPayload } from '../models/token/token'

export class IsAuthenticatedMiddleware
    implements MiddlewarePort<UserTokenPayload>
{
    constructor(private readonly tokenHandler: TokenHandlerPort) {}

    async handleRequest(
        request: HttpRequestMiddlewareModel
    ): Promise<UserTokenPayload> {
        if (
            !hasRequiredKey(request, 'headers') ||
            !hasRequiredKey(request.headers, 'authorization')
        ) {
            throw new UnAuthorizedRequestErrorPresenter('Token no encontrado')
        }

        const { authorization } = request.headers
        let [, token] = authorization.split(/\s+/)

        if (typeof token === 'undefined') token = ''
        else if (typeof token !== 'string') {
            throw new UnAuthorizedRequestErrorPresenter(
                'Formato de Token invalido'
            )
        }

        try {
            const { userId, roles } = this.tokenHandler.verifySessionTokens(
                token,
                'activeSession'
            )
            return {
                userId,
                roles,
            }
        } catch (error) {
            throw new ForbiddenRequestErrorPresenter('Token Invalido|Expirado')
        }
    }
}
