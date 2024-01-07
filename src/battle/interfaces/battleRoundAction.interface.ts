import { EActionType } from "../../common/enum";
import { PetStatus } from "../../pets/class/petStatus";

export interface IBattleRoundAction {
  playerId: string;
  action: EActionType;
  status: PetStatus;
  targetId?: string;
  seed: number;
}
