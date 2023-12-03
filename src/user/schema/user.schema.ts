import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";
import { EUserRole, IUser } from "../../user";

export type UserDocument = UserModel & Document;
@Schema()
export class UserModel implements IUser {
  @Prop({ _id: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: 0 })
  pepeseCoin: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: EUserRole;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(UserModel);
