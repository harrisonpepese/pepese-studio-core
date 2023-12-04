import { EActionType } from "../../common";
import { PetStatus } from "../../pets/class/petStatus";

export interface IBattleRoundAction {
  playerId: string;
  petStatus: PetStatus;
  action?: EActionType;
  targetId: string;
  seed: number;
}
