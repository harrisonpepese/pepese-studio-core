import { EActionType } from "../../common";
import { PetStatus } from "../../pets";
import {
  EBattleEvents,
  EBattleStatus,
  EBattleTeam,
  EBattleTimer,
} from "../enum";
import { IBattlePet, IBattleRoundAction } from "../interface";
import { Battle } from "./battle";
import { BattleRound } from "./battleRound";
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
const mockBattlePet: IBattlePet = {
  playerId: "123",
  petId: "123",
  status: new PetStatus(statusAttributes),
};

const mockRoundAction: IBattleRoundAction = {
  playerId: "123",
  petStatus: new PetStatus(statusAttributes),
  action: EActionType.attack,
  targetId: "123",
  seed: 0.5,
};

describe("Battle Test", () => {
  jest.useFakeTimers();
  let battle: Battle;
  beforeEach(() => {
    jest.clearAllMocks();
    battle = new Battle(mockBattlePet, mockBattlePet);
  });

  it("should create a battle", () => {
    expect(battle).toBeTruthy();
    expect(battle.uuid).toBeTruthy();
    expect(battle.status).toBe("waiting");
    expect(battle.endedRounds).toEqual([]);
    expect(battle.createdAt).toBeTruthy();
  });

  it("should start a battle", () => {
    const mockCreateRound = jest.spyOn(battle, "createRound");
    const mockEmit = jest.spyOn(battle, "emit");
    const dto = battle.toDto();
    dto.status = EBattleStatus.inProgress;
    battle.start();
    expect(battle.status).toBe(EBattleStatus.inProgress);
    expect(mockCreateRound).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(EBattleEvents.start, dto);
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
    const mockRound = new BattleRound();
    const mockExecute = jest.spyOn(mockRound, "executeRound");
    battle.currentRound = mockRound;
    const time = 5;
    const mockStart = jest.spyOn(battle, "executeRound");
    const mockEmit = jest.spyOn(battle, "emit");

    battle.setTimer(time, EBattleTimer.roundActionTimeout);
    expect(battle.timer).toBeTruthy();
    expect(battle.timerSeconds).toBe(time - 1);

    jest.runAllTimers();

    expect(mockEmit).toHaveBeenCalledTimes(time - 1);
    expect(mockStart).toHaveBeenCalled();
    expect(mockExecute).toHaveBeenCalled();
  });

  it("should create a round", () => {
    const mockSetTimer = jest.spyOn(battle, "setTimer");
    const mockExecute = jest
      .spyOn(battle, "executeRound")
      .mockImplementation(() => {});
    battle.createRound();
    expect(battle.currentRound).toBeTruthy();
    expect(mockSetTimer).toHaveBeenCalledWith(
      10,
      EBattleTimer.roundActionTimeout
    );
    expect(mockExecute).not.toHaveBeenCalled();
  });

  it("should not create a round if roud not ended", () => {
    battle.currentRound = new BattleRound();
    const mockSetTimer = jest.spyOn(battle, "setTimer");
    battle.createRound();
    expect(mockSetTimer).not.toHaveBeenCalled();
  });

  it("should add roudAction", () => {
    battle.currentRound = new BattleRound();
    battle.blueTeam = mockBattlePet;
    battle.redTeam = mockBattlePet;
    const mockAddAction = jest.spyOn(battle.currentRound, "addAction");
    battle.addRoundAction(mockRoundAction);
    expect(mockAddAction).toHaveBeenCalledWith(mockRoundAction);
  });
});
