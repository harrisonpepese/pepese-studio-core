import * as bcript from "bcrypt";
import { EUserRole, IUser } from "../../user";
import { IUserAttributes } from "../interface/user.interface";

export class User implements IUser {
  constructor(props: IUserAttributes) {
    Object.assign(this, props);
  }
  id: string;
  name: string;
  email: string;
  pepeseCoin: number;
  password: string;
  role: EUserRole;
  createdAt: Date;
  updatedAt: Date;

  async changePassword(currentPassword: string, newPassword: string) {
    if (currentPassword === newPassword) {
      throw "error";
    }
    this.password = await this.hashPassword(newPassword);
  }

  async verifyPassword(rawPassword: string) {
    return await bcript.compare(rawPassword, this.password);
  }

  async hashPassword(rawPassword: string): Promise<string> {
    return await bcript.hash(rawPassword, await bcript.genSalt());
  }
}
