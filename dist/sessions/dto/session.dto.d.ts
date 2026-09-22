import { Session } from "../entities/session.entity.js";
export declare class SessionDTO {
    id: Session['id'];
    revoked_at: Session['revoked_at'] | null;
}
