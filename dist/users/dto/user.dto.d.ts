import { User } from "../entities/user.entity.js";
export declare class UserDTO {
    id?: User['id'];
    name: User['name'];
    email: User['email'];
    role: User['role'];
    is_active: User['is_active'];
}
