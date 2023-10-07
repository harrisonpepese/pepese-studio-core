import { EUserRole } from "../enum/userRole.enum";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    pepeseCoin:number;
    role: EUserRole;
    created_at: Date;
    updated_at: Date;
}