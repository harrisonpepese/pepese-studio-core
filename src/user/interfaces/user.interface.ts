import { IBaseEntity } from "../../common/entity/baseEntity.interface";
import { EUserRole } from "../enum/userRole.enum";

export interface IUserAttributes extends IBaseEntity {
  name: string;
  email: string;
  password: string;
  pepeseCoin: number;
  role: EUserRole;
}

export interface IUser extends IUserAttributes {}
