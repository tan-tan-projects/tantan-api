import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'role';
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);
//# sourceMappingURL=roles.js.map