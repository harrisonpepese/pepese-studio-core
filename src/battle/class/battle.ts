import { EBattleStatus } from "../enum/battleStatus.enum";
import { EBattleTeam } from "../enum/battleTeam.enum";
import { EBattleTimer } from "../enum/battleTimer.enum";
import { EBattleType } from "../enum/battleType.enum";
import { IBattle, IBattleAttributes } from "../interface/battle.interface";
import { EventEmitter } from "stream";
import { IBattlePet } from "../interface/battlePet.interface";
import { IBattleRound } from "../interface/battleRound.interface";
import { randomUUID } from "crypto";
import { EBattleEvents } from "../enum/battleEvent.enum";
import { BattleRound } from "./battleRound";

export class Battle extends EventEmitter implements IBattle {
  constructor() {
    super();
    this.uuid = randomUUID();
    this.status = EBattleStatus.waiting;
    this.endedRounds = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: string;
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
  createdAt: Date;
  updatedAt: Date;

  start(): void {
    this.status = EBattleStatus.inProgress;
    this.emit(EBattleEvents.start, this.toDto());
    this.createRound();
  }
  setTimer(seconds: number, type: EBattleTimer): void {
    this.timerSeconds = seconds;
    this.timer = setInterval(async () => {
      if (this.timerSeconds <= 0) {
        clearInterval(this.timer);
        switch (type) {
          case EBattleTimer.roundActionTimeout:
            this.executeRound();
            return;
          case EBattleTimer.startDelay:
            this.start();
            return;
          default:
            return;
        }
      }
      this.timerSeconds--;
      this.emit(EBattleEvents.timerTick, this.toDto());
    }, 1000);
  }
  createRound(): void {
    if (!this.currentRound) {
      this.currentRound = new BattleRound();
    }
  }
  addRoundAction(action: any): void {
    throw new Error("Method not implemented.");
  }
  executeRound(): void {
    throw new Error("Method not implemented.");
  }
  end(): void {
    throw new Error("Method not implemented.");
  }
  toDto(): IBattleAttributes {
    throw new Error("Method not implemented.");
  }
}
