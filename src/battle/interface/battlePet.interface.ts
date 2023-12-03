import { DamageType } from "../../common";
import { IPetStatus } from "../../pets/interface/petStatus.interface";

export interface IBattlePet {
  playerId: string;
  status: IPetStatus;
}
