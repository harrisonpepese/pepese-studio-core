import { EDamageType, EActionType } from "../../common";
import { PetStatus } from "../../pets";
import {
  EBattleEvents,
  EBattleStatus,
  EBattleTeam,
  EBattleTimer,
} from "../enum";
import { IBattlePet, IBattleRoundAction } from "../interface";
import { Battle } from "./battle";

const statusAttributes = {
  health: 100,
  stamina: 100,
  physicalAttack: 100,
  magicAttack: 100,
  physicalDefense: 100,
  magicaDefense: 100,
  speed: 100,
  acurency: 100,
  dodge: 100,
};

const mockBattlePet = (id: string): IBattlePet => ({
  playerId: id,
  petId: id,
  status: new PetStatus({ ...statusAttributes }),
});

const mockRoundAction = (
  origin: string,
  target: string,
  action: EActionType
): IBattleRoundAction => ({
  playerId: origin,
  status: new PetStatus({ ...statusAttributes }),
  action,
  targetId: target,
  seed: 0.5,
});

describe("Battle Test", () => {
  jest.useFakeTimers();
  let battle: Battle;
  beforeEach(() => {
    jest.clearAllMocks();
    battle = new Battle(mockBattlePet("1"), mockBattlePet("2"));
  });

  it("should create a battle", () => {
    expect(battle).toBeTruthy();
    expect(battle.uuid).toBeTruthy();
    expect(battle.status).toBe(EBattleStatus.starting);
    expect(battle.roundCount).toBe(0);
    expect(battle.roundActions).toEqual([]);
    expect(battle.logs).toEqual([]);
    expect(battle.createdAt).toBeTruthy();
  });

  it("should start a battle", () => {
    const mockCreateRound = jest
      .spyOn(battle, "createRound")
      .mockImplementation(() => {});
    const mockEmit = jest.spyOn(battle, "emit");
    battle.start();
    const dto = battle.toDto();
    expect(mockCreateRound).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(EBattleEvents.start, dto);
    expect(battle.logs.length).toEqual(1);
  });

  it("should set a timer 'startDelay'", () => {
    const time = 5;
    const mockStart = jest.spyOn(battle, "start").mockImplementation(() => {});
    const mockEmit = jest.spyOn(battle, "emit");
    battle.setTimer(time, EBattleTimer.startDelay);
    expect(battle.timer).toBeTruthy();
    expect(battle.timerSeconds).toBe(time - 1);

    jest.runAllTimers();

    expect(mockEmit).toHaveBeenCalledTimes(time - 1);
    expect(mockStart).toHaveBeenCalled();
  });

  it("should set a timer 'roundActionTimeout'", () => {
    const time = 5;
    const mockStart = jest
      .spyOn(battle, "executeRound")
      .mockImplementation(() => {});
    const mockEmit = jest.spyOn(battle, "emit");
    battle.setTimer(time, EBattleTimer.roundActionTimeout);
    expect(battle.timer).toBeTruthy();
    expect(battle.timerSeconds).toBe(time - 1);

    jest.runAllTimers();

    expect(mockEmit).toHaveBeenCalledTimes(time - 1);
    expect(mockStart).toHaveBeenCalled();
  });

  it("should not create a roud if battle is finished", () => {
    battle.status = EBattleStatus.finished;
    expect(() => battle.createRound()).toThrow();
  });

  it("should not create a roud if battle is in progress", () => {
    battle.status = EBattleStatus.roundInProgress;
    expect(() => battle.createRound()).toThrow();
  });

  it("should create a round", () => {
    jest.spyOn(battle, "setTimer").mockImplementation(() => {});
    battle.createRound();
    expect(battle.roundCount).toBe(1);
    expect(battle.roundActions).toEqual([]);
    expect(battle.status).toBe(EBattleStatus.roundInProgress);
  });

  it("should add a round action", () => {
    battle.status = EBattleStatus.roundInProgress;
    battle.addRoundAction(mockRoundAction("1", "2", EActionType.attack));
    expect(battle.roundActions.length).toBe(1);
  });

  it("should not add a round action if battle is not in progress", () => {
    battle.status = EBattleStatus.starting;
    expect(() =>
      battle.addRoundAction(mockRoundAction("1", "2", EActionType.attack))
    ).toThrow();
  });

  it("should not add a round action if player already has an action", () => {
    battle.status = EBattleStatus.roundInProgress;
    battle.addRoundAction(mockRoundAction("2", "1", EActionType.attack));
    expect(() =>
      battle.addRoundAction(mockRoundAction("2", "1", EActionType.attack))
    ).toThrow();
  });

  it("should not add a round action if player not found", () => {
    battle.status = EBattleStatus.roundInProgress;
    expect(() =>
      battle.addRoundAction(mockRoundAction("123", "1", EActionType.attack))
    ).toThrow();
  });

  it("should execute a round", () => {
    jest
      .spyOn(battle, "checkIfBattleEndAfterRound")
      .mockImplementation(() => {});
    battle.status = EBattleStatus.roundInProgress;
    battle.roundActions = [
      mockRoundAction("1", "2", EActionType.attack),
      mockRoundAction("2", "1", EActionType.attack),
    ];
    battle.executeRound();
    expect(battle.status).toBe(EBattleStatus.roundEnded);
    expect(battle.checkIfBattleEndAfterRound).toHaveBeenCalled();
  });

  it("should not execute a round if s not im progress", () => {
    battle.status = EBattleStatus.roundEnded;
    battle.roundActions = [
      mockRoundAction("1", "2", EActionType.attack),
      mockRoundAction("2", "1", EActionType.attack),
    ];
    expect(() => battle.executeRound()).toThrow();
  });

  it("should execute a round with attack and defense", () => {
    jest
      .spyOn(battle, "checkIfBattleEndAfterRound")
      .mockImplementation(() => {});
    const mockDamage = jest.spyOn(PetStatus.prototype, "damage");
    battle.status = EBattleStatus.roundInProgress;
    battle.roundActions = [
      mockRoundAction("1", "2", EActionType.attack),
      mockRoundAction("2", undefined, EActionType.defense),
    ];
    battle.executeRound();
    expect(mockDamage).toHaveBeenCalled();
    expect(mockDamage).toHaveBeenCalledWith({
      amount: 50,
      type: EDamageType.physical,
      defBonus: 1,
    });
  });

  it("should execute a round with attack and dodge fail", () => {
    jest
      .spyOn(battle, "checkIfBattleEndAfterRound")
      .mockImplementation(() => {});
    const mockDamage = jest.spyOn(PetStatus.prototype, "damage");
    battle.status = EBattleStatus.roundInProgress;
    battle.roundActions = [
      mockRoundAction("1", "2", EActionType.attack),
      mockRoundAction("2", undefined, EActionType.dodge),
    ];
    battle.executeRound();
    expect(mockDamage).toHaveBeenCalled();
    expect(mockDamage).toHaveBeenCalledWith({
      amount: 50,
      type: EDamageType.physical,
    });
  });

  it("should execute a round with attack and dodge fail", () => {
    jest
      .spyOn(battle, "checkIfBattleEndAfterRound")
      .mockImplementation(() => {});
    const mockDamage = jest.spyOn(PetStatus.prototype, "damage");
    battle.status = EBattleStatus.roundInProgress;
    battle.roundActions = [
      mockRoundAction("1", "2", EActionType.attack),
      mockRoundAction("2", undefined, EActionType.dodge),
    ];
    battle.roundActions[0].status.currentStatus.acurency = 0;
    battle.executeRound();
    expect(mockDamage).not.toHaveBeenCalled();
  });

  it("should execute a round with heal", () => {
    jest
      .spyOn(battle, "checkIfBattleEndAfterRound")
      .mockImplementation(() => {});
    const mockHeal = jest.spyOn(PetStatus.prototype, "heal");
    battle.status = EBattleStatus.roundInProgress;
    battle.roundActions = [
      mockRoundAction("2", undefined, EActionType.healing),
    ];
    battle.executeRound();
    expect(mockHeal).toHaveBeenCalled();
  });

  it("should execute a round with heal", () => {
    jest
      .spyOn(battle, "checkIfBattleEndAfterRound")
      .mockImplementation(() => {});
    const mockRest = jest.spyOn(PetStatus.prototype, "rest");
    battle.status = EBattleStatus.roundInProgress;
    battle.roundActions = [mockRoundAction("2", undefined, EActionType.rest)];
    battle.executeRound();
    expect(mockRest).toHaveBeenCalled();
  });

  it("should check if battle end", () => {
    const mockEmit = jest.spyOn(battle, "emit");
    battle.end();
    expect(mockEmit).toHaveBeenCalled();
    expect(battle.status).toBe(EBattleStatus.finished);
  });

  it("should check if battle end after round", () => {
    const mockEnd = jest.spyOn(battle, "end").mockImplementation(() => {});
    battle.blueTeam.status.currentStatus.health = 0;
    battle.checkIfBattleEndAfterRound();
    expect(battle.winner).toBe(EBattleTeam.red);
    expect(mockEnd).toHaveBeenCalled();
  });

  it("should check if battle end after round", () => {
    const mockEnd = jest.spyOn(battle, "end").mockImplementation(() => {});
    battle.redTeam.status.currentStatus.health = 0;
    battle.checkIfBattleEndAfterRound();
    expect(battle.winner).toBe(EBattleTeam.blue);
    expect(mockEnd).toHaveBeenCalled();
  });

  it("should check if battle end after round", () => {
    const mockcreateRound = jest
      .spyOn(battle, "createRound")
      .mockImplementation(() => {});
    battle.checkIfBattleEndAfterRound();
    expect(mockcreateRound).toHaveBeenCalled();
  });
});
