import { EPetActionType } from "../../pets";
import { IPetStatus } from "../../pets/interface/petStatus.interface";

export interface IBattleRoundActionAttributes {
  playerId: string;
  petStatus: IPetStatus;
  action?: EPetActionType;
  targetId: string;
  seed: number;
}

export interface IBattleRoundAction {
  getDamage: () => number;
  getSpeed: () => number;
}
