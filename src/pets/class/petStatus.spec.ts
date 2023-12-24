import { EDamageType } from "../../common/enum";
import { IPetAttributes } from "../interfaces";
import { PetStatus } from "./petStatus";
const attributes: IPetAttributes = {
  strength: 10,
  dexterity: 10,
  agility: 10,
  intelligence: 10,
  vitality: 10,
  lucky: 10,
};

const bonus = 2;
describe("PetStatus", () => {
  let petStatus: PetStatus;

  beforeEach(() => {
    petStatus = new PetStatus(attributes);
  });

  it("should create a pet status", () => {
    expect(petStatus).toBeDefined();
    expect(petStatus).toBeInstanceOf(PetStatus);
  });

  it("should get the speed", () => {
    expect(petStatus.getSpeed()).toBe(petStatus.currentStatus.speed);
    expect(petStatus.getSpeed({ bonus })).toBe(
      petStatus.currentStatus.speed * bonus
    );
  });
  it("should get the attack", () => {
    expect(petStatus.getAttack({ type: EDamageType.physical })).toBe(
      petStatus.currentStatus.physicalAttack
    );
    expect(petStatus.getAttack({ type: EDamageType.physical, bonus: 1 })).toBe(
      petStatus.currentStatus.physicalAttack
    );
    expect(petStatus.getAttack({ type: EDamageType.magic })).toBe(
      petStatus.currentStatus.magicAttack
    );
    expect(petStatus.getAttack({ type: EDamageType.real })).toBe(
      Math.floor(
        (petStatus.currentStatus.physicalAttack +
          petStatus.currentStatus.magicAttack) *
          0.5
      )
    );
  });
  it("should get the defense", () => {
    expect(petStatus.getDefense({ type: EDamageType.physical })).toBe(
      petStatus.currentStatus.physicalDefense
    );
    expect(petStatus.getDefense({ type: EDamageType.magic })).toBe(
      petStatus.currentStatus.magicaDefense
    );
    expect(petStatus.getDefense({ type: EDamageType.real })).toBe(
      Math.floor(
        (petStatus.currentStatus.physicalDefense +
          petStatus.currentStatus.magicaDefense) *
          0.25
      )
    );
  });

  it("should get the healing", () => {
    const life = petStatus.currentStatus.health;
    expect(petStatus.getHealing()).toBe(Math.floor(life * 0.2));
    expect(petStatus.getHealing({ bonus })).toBe(
      Math.floor(life * 0.2) * bonus
    );
  });

  it("should get the resting", () => {
    const stamina = petStatus.currentStatus.stamina;
    expect(petStatus.getResting()).toBe(Math.floor(stamina * 0.2));
    expect(petStatus.getResting({ bonus })).toBe(
      Math.floor(stamina * 0.2) * bonus
    );
  });
  it("should get the dodging", () => {
    const dodge = petStatus.currentStatus.dodge;
    expect(petStatus.getDodging()).toBe(dodge);
    expect(petStatus.getDodging({ bonus })).toBe(dodge * bonus);
  });
  it("should get the acurency", () => {
    const acurency = petStatus.currentStatus.acurency;
    expect(petStatus.getAcurency()).toBe(acurency);
    expect(petStatus.getAcurency({ bonus })).toBe(acurency * bonus);
  });

  it("should damage 10", () => {
    let damage = 10;
    const damageDone = petStatus.damage({
      amount: damage,
      type: EDamageType.physical,
    });
    const defense = petStatus.getDefense({ type: EDamageType.physical });
    damage -= defense;
    if (damage <= defense) damage = 1;

    expect(damageDone).toBe(damage);
  });

  it("should damage 1000", () => {
    let damage = 1000;
    const damageDone = petStatus.damage({
      amount: 1000,
      type: EDamageType.physical,
    });
    const defense = petStatus.getDefense({ type: EDamageType.physical });
    damage -= defense;
    if (damage <= defense) damage = 1;

    expect(damageDone).toBe(damage);
  });

  it("should heal", () => {
    const life = petStatus.currentStatus.health;
    const healDone = petStatus.heal(1);
    expect(healDone).toBe(Math.floor(life * 0.2));
  });

  it("should rest", () => {
    const stamina = petStatus.currentStatus.stamina;
    const restDone = petStatus.rest(1);
    expect(restDone).toBe(Math.floor(stamina * 0.2));
  });

  it("should spend stamina", () => {
    const spend = 100;
    const restDone = petStatus.spendStamina(spend);
    expect(restDone).toBe(100);
  });
});
