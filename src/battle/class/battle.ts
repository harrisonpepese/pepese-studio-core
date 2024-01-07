import { EBattleStatus } from "../enum/battleStatus.enum";
import { EBattleTeam } from "../enum/battleTeam.enum";
import { EBattleTimer } from "../enum/battleTimer.enum";
import { EBattleType } from "../enum/battleType.enum";
import {
  IBattle,
  IBattleAttributes,
  addRoundActionParams,
} from "../interfaces/battle.interface";
import { EventEmitter } from "stream";
import { IBattlePet } from "../interfaces/battlePet.interface";
import { randomUUID } from "crypto";
import { EBattleEvents } from "../enum/battleEvent.enum";
import { IBattleRoundAction } from "../interfaces";
import { EDamageType, EActionType } from "../../common/enum";

import { BattleException } from "../../common/exception/battle.exception";
import { RandomService } from "../../common/services";
import { PetStatus } from "../../pets/class";

export class Battle extends EventEmitter implements IBattle {
  constructor(redTeam: IBattlePet, blueTeam: IBattlePet) {
    super();
    this.uuid = randomUUID();
    this.status = EBattleStatus.starting;
    this.roundCount = 0;
    this.roundActions = [];
    this.logs = [];
    this.redTeam = redTeam;
    this.blueTeam = blueTeam;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: string;
  uuid: string;
  type: EBattleType;
  status: EBattleStatus;
  timer: any;
  timerSeconds: number;
  roundCount: number;
  roundActions: IBattleRoundAction[];
  logs: string[];
  blueTeam: IBattlePet;
  redTeam: IBattlePet;
  winner?: EBattleTeam;
  createdAt: Date;
  updatedAt: Date;

  start(): void {
    this.createRound();
    this.emit(EBattleEvents.start, this.toDto());
    this.logs.push("Battle started");
  }

  setTimer(seconds: number, type: EBattleTimer): void {
    this.timerSeconds = seconds - 1;
    this.timer = setInterval(() => {
      if (this.timerSeconds <= 0) {
        clearInterval(this.timer);
        switch (type) {
          case EBattleTimer.roundActionTimeout:
            this.executeRound();
            return;
          case EBattleTimer.startDelay:
            this.start();
            return;
        }
      }
      this.timerSeconds--;
      this.emit(EBattleEvents.timerTick, this.toDto());
    }, 1000);
  }

  createRound(): void {
    if (this.status === EBattleStatus.finished)
      throw new BattleException("C'ant create round, this battle is finished");
    if (this.status === EBattleStatus.roundInProgress)
      throw new BattleException("C'ant create round, a round is in progress");
    this.status = EBattleStatus.roundInProgress;
    this.roundCount++;
    this.roundActions = [];
    this.logs.push(`Round ${this.roundCount} started`);
    this.setTimer(10, EBattleTimer.roundActionTimeout);
  }

  private getRoundActionSeed(): number {
    return RandomService.rangeFloat(0.5, 1.5);
  }

  addRoundAction(params: addRoundActionParams): void {
    if (this.status !== EBattleStatus.roundInProgress)
      throw new BattleException("C'ant add action, a round is in progress");
    const { playerId, action, targetId } = params;
    const currentAction = this.roundActions.find(
      (action) => action.playerId === playerId
    );
    if (currentAction)
      throw new BattleException("C'ant add action, a action already exists");
    const seed = this.getRoundActionSeed();
    const status = this.getPetStatusByPlayerId(playerId);
    this.roundActions.push({
      playerId,
      action,
      targetId,
      seed,
      status,
    });
    this.logs.push(
      `player: ${playerId} added action ${action} to round: ${this.roundCount} with seed: ${seed}`
    );
  }

  private getPetStatusByPlayerId(playerId: string): PetStatus {
    if (this.redTeam.playerId === playerId) return this.redTeam.status;
    if (this.blueTeam.playerId === playerId) return this.blueTeam.status;
    throw new BattleException("Pet not found");
  }

  executeRound(): void {
    if (this.status !== EBattleStatus.roundInProgress)
      throw new BattleException(
        "C'ant execute round, a round is not in progress"
      );
    this.roundActions.sort((a, b) => {
      return a.seed - b.seed;
    });
    for (const action of this.roundActions) {
      const target = this.roundActions.find(
        (x) => x.playerId === action.targetId
      );
      this.executeAction(action, target);
    }
    this.status = EBattleStatus.roundEnded;
    this.checkIfBattleEndAfterRound();
  }

  private executeAction(
    origin: IBattleRoundAction,
    target?: IBattleRoundAction
  ) {
    switch (origin.action) {
      case EActionType.attack:
        this.baseAttack(origin, target);
        break;
      case EActionType.rest:
        origin.status.rest(origin.seed);
        break;
      case EActionType.healing:
        origin.status.heal(origin.seed);
        break;
    }
  }

  private baseAttack(origin: IBattleRoundAction, target: IBattleRoundAction) {
    const damageType = EDamageType.physical;
    const damage = origin.status.getAttack({
      type: damageType,
      bonus: origin.seed,
    });
    const originBonus = {
      bonus: origin.seed,
    };
    const targetBonus = {
      bonus: target.seed,
    };
    if (target.action === EActionType.defense) {
      target.status.damage({
        amount: damage,
        type: damageType,
        defBonus: Math.floor(target.seed * 2),
      });
      return;
    }
    if (target.action === EActionType.dodge) {
      if (
        target.status.getDodging(originBonus) >
        origin.status.getAcurency(targetBonus)
      ) {
        return;
      }
    }
    target.status.damage({
      amount: damage,
      type: damageType,
    });
  }

  end(): void {
    this.status = EBattleStatus.finished;
    this.emit(EBattleEvents.end, this.toDto());
  }

  checkIfBattleEndAfterRound() {
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

  toDto(): Omit<IBattleAttributes, "timer"> {
    return {
      id: this.id,
      uuid: this.uuid,
      type: this.type,
      status: this.status,
      roundCount: this.roundCount,
      roundActions: this.roundActions,
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
