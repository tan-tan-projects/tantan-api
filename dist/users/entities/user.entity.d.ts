export declare const UserStatus: {
    readonly ACTIVE: true;
    readonly INACTIVE: false;
};
export declare class User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    is_active: Boolean;
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
}
