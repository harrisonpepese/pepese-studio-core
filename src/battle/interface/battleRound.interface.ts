import { IBattleRoundAction } from "./battleRoundAction.interface";

export interface IBattleRoundAttributes {
  actions: IBattleRoundAction[];
}
export interface IBattleRound extends IBattleRoundAttributes {
  canExecute: () => boolean;
  addAction: (action: IBattleRoundAction) => void;
  executeRound: () => void;
  executeAction: (
    origin: IBattleRoundAction,
    target: IBattleRoundAction
  ) => void;
}
