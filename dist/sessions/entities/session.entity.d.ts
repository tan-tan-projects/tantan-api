import { User } from "../../users/entities/user.entity.js";
export declare class Session {
    id: string;
    userId: string;
    jti: string;
    user: User;
    created_at: Date;
    expires_at: Date;
    revoked_at: Date;
}
