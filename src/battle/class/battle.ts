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
import { IBattleRoundAction } from "../interface";
import { EActionType, RandomService } from "../../common";

export class Battle extends EventEmitter implements IBattle {
  constructor(redTeam: IBattlePet, blueTeam: IBattlePet) {
    super();
    this.uuid = randomUUID();
    this.status = EBattleStatus.waiting;
    this.endedRounds = [];
    this.redTeam = redTeam;
    this.blueTeam = blueTeam;
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
    this.timerSeconds = seconds - 1;
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
      this.currentRound = new BattleRound([
        this.createRoundAction(this.redTeam.playerId),
        this.createRoundAction(this.blueTeam.playerId),
      ]);

      this.setTimer(10, EBattleTimer.roundActionTimeout);
    }
  }

  private createRoundAction(playerId: string): IBattleRoundAction {
    const petStatus =
      playerId === this.redTeam.playerId
        ? this.redTeam.status
        : this.blueTeam.status;
    return {
      playerId,
      petStatus,
      seed: this.getroundActionSeed(),
    };
  }

  private getroundActionSeed(): number {
    return RandomService.rangeFloat(0.5, 1.5);
  }

  addRoundAction(playerId: string, action: EActionType): void {
    if (!this.currentRound) {
      return;
    }
    const currentAction = this.currentRound.actions.find(
      (x) => x.playerId == playerId
    );
    this.currentRound.addAction({});
    if (this.currentRound.canExecute()) {
      this.executeRound();
    }
  }

  executeRound(): void {
    this.currentRound.executeRound();
    this.checkIfBattleEnd();
  }

  end(): void {
    this.status = EBattleStatus.finished;
    this.emit(EBattleEvents.end, this.toDto());
  }

  private checkIfBattleEnd() {
    if (this.blueTeam.status.currentStatus.health <= 0) {
      this.winner = EBattleTeam.red;
      return this.end();
    }
    if (this.redTeam.status.currentStatus.health <= 0) {
      this.winner = EBattleTeam.blue;
      return this.end();
    }
    this.createRound();
  }

  toDto(): IBattleAttributes {
    return {
      id: this.id,
      uuid: this.uuid,
      type: this.type,
      status: this.status,
      endedRounds: this.endedRounds,
      currentRound: this.currentRound,
      timer: this.timer,
      timerSeconds: this.timerSeconds,
      logs: this.logs,
      blueTeam: this.blueTeam,
      redTeam: this.redTeam,
      winner: this.winner,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
