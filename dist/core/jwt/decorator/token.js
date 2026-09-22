import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
export const CToken = createParamDecorator((data, ctx) => {
    const config = new ConfigService();
    const { secret } = config.getOrThrow('jwt');
    const req = ctx.switchToHttp().getRequest();
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.substr(authorization.indexOf(' ') + 1) : null;
    try {
        if (!token)
            return { token, payload: null };
        const payload = verify(token, secret, { ignoreExpiration: true });
        payload["isExpired"] = Date.now() >= payload.exp * 1000 ? true : false;
        return { token, payload };
    }
    catch (err) {
        throw new UnauthorizedException(err.message);
    }
});
//# sourceMappingURL=token.js.map