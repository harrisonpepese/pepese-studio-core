import { EActionType } from "../../common";
import { PetStatus } from "../../pets/class/petStatus";

export interface IBattleRoundAction {
  playerId: string;
  action: EActionType;
  status: PetStatus;
  targetId: string;
  seed: number;
}
