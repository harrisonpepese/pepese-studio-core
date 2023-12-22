import { DamageType } from "../../common";
import { EActionType } from "../../common";
import { IBattleRound } from "../interface/battleRound.interface";
import { IBattleRoundAction } from "../interface/battleRoundAction.interface";

export class BattleRound implements IBattleRound {
  actions: IBattleRoundAction[];
  constructor(baseActions: IBattleRoundAction[]) {
    this.actions = baseActions;
  }

  canExecute() {
    return this.actions.length == 2;
  }

  addAction(action: IBattleRoundAction) {
    const currentAction = this.actions.findIndex(
      (x) => x.playerId === action.playerId
    );
    if (currentAction > -1) {
      this.actions[currentAction] = action;
      return;
    }
    this.actions.push(action);
  }

  executeRound() {
    this.actions.sort((a, b) => {
      return (
        a.petStatus.getSpeed({ bonus: a.seed }) -
        b.petStatus.getSpeed({ bonus: b.seed })
      );
    });
    for (const action of this.actions) {
      const target = this.actions.find((x) => x.playerId === action.targetId);
      this.executeAction(action, target);
    }
  }

  executeAction(origin: IBattleRoundAction, target?: IBattleRoundAction) {
    if (origin.action === EActionType.attack) {
      this.baseAttack(origin, target);
    }
    if (origin.action === EActionType.rest) {
      this.rest(origin);
    }
    if (origin.action === EActionType.healing) {
      this.healing(origin);
    }
  }

  baseAttack(origin: IBattleRoundAction, target: IBattleRoundAction) {
    const damageType = DamageType.physical;
    const damage = origin.petStatus.getAttack({
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
      target.petStatus.damage({
        amount: damage,
        type: damageType,
        defBonus: Math.floor(target.seed * 2),
      });
      return;
    }
    if (target.action === EActionType.dodge) {
      if (
        target.petStatus.getDodging(originBonus) >
        origin.petStatus.getAcurency(targetBonus)
      ) {
        return;
      }
    }
    target.petStatus.damage({
      amount: damage,
      type: damageType,
    });
  }

  rest(origin: IBattleRoundAction) {
    origin.petStatus.rest(origin.seed);
  }

  healing(origin: IBattleRoundAction) {
    origin.petStatus.heal(origin.seed);
  }
}
