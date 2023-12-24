import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { IPet } from "../interfaces/pet.interface";
import { PetAttributes } from "../class/petAttributes";
import { EElementType, EHabitatType } from "../../common/enum";
import { EPetTier } from "../enum/petTier.enum";

export type PetDocument = PetModel & Document;

@Schema()
export class PetModel implements IPet {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop({ type: Types.ObjectId, ref: "Player" })
  playerId: string;
  @Prop()
  tier: EPetTier;
  @Prop()
  habitat: EHabitatType;
  @Prop()
  elemet: EElementType;
  @Prop()
  baseAttributes: PetAttributes;
  @Prop()
  currentAttributes: PetAttributes;
  @Prop({ default: 0 })
  level: number;
  @Prop({ default: 0 })
  attributePoints: number;
  @Prop({ default: 0 })
  avaliableAttributePoints: number;
  @Prop({ default: 0 })
  experience: number;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const PetSchema = SchemaFactory.createForClass(PetModel);
