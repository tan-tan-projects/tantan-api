import { createParamDecorator } from '@nestjs/common';
export const CUser = createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});
//# sourceMappingURL=user.js.map