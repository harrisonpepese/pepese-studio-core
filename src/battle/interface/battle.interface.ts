import { EActionType } from "../../common";
import { IBaseEntity } from "../../common/entity/baseEntity.interface";
import { EBattleStatus } from "../enum/battleStatus.enum";
import { EBattleTeam } from "../enum/battleTeam.enum";
import { EBattleTimer } from "../enum/battleTimer.enum";
import { EBattleType } from "../enum/battleType.enum";
import { IBattlePet } from "./battlePet.interface";
import { IBattleRound } from "./battleRound.interface";
import { IBattleRoundAction } from "./battleRoundAction.interface";

export interface IBattleAttributes extends IBaseEntity {
  uuid: string;
  type: EBattleType;
  status: EBattleStatus;
  roundCount: number;
  roundActions: IBattleRoundAction[];
  timer: any;
  timerSeconds: number;
  logs: string[];
  blueTeam: IBattlePet;
  redTeam: IBattlePet;
  winner?: EBattleTeam;
}

export interface IBattle extends IBattleAttributes {
  start(): void;
  setTimer(seconds: number, type: EBattleTimer): void;
  createRound(): void;
  addRoundAction(params: addRoundActionParams): void;
  executeRound(): void;
  end(): void;
  toDto(): IBattleAttributes;
}

export type addRoundActionParams = {
  playerId: string;
  action: EActionType;
  targetId?: string;
};
