import { EPetActionType } from "../../pets";
import { PetStatus } from "../../pets/class/petStatus";

export interface IBattleRoundAction {
  playerId: string;
  petStatus: PetStatus;
  action?: EPetActionType;
  targetId: string;
  seed: number;
}
