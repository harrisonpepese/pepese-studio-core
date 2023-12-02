import { IBaseEntity } from "../../common/entity/baseEntity.interface";
import { EElementType } from "../../common/enum/elementType.enum";
import { EHabitatType } from "../../common/enum/habitatType.enum";
import { EPetTier } from "../enum/petTier.enum";
import { IPetAttributes } from "./petAttributes.interface";

export interface IPet extends IBaseEntity {
  name: string;
  playerId: string;
  tier: EPetTier;
  habitat: EHabitatType;
  elemet: EElementType;
  baseAttributes: IPetAttributes;
  currentAttributes: IPetAttributes;
  level: number;
  attributePoints: number;
  avaliableAttributePoints: number;
  experience: number;
}
