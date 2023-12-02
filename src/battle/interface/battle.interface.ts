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
  endedRounds: IBattleRound[];
  currentRound: IBattleRound;
  timer: any;
  timerSeconds: number;
  logs: string[];
  blueTeam: IBattlePet;
  redTeam: IBattlePet;
  winner?: EBattleTeam;
}

export interface IBattle extends IBattleAttributes {
  start: () => void;
  setTimer: (seconds: number, type: EBattleTimer) => void;
  createRound: () => void;
  addRoundAction: (action: IBattleRoundAction) => void;
  executeRound: () => void;
  end: () => void;
}
