import { DamageType } from "../../common";
import { IPetAttributes } from "../interface/petAttributes.interface";
import {
  IPetStatus,
  IPetStatusAttributes,
  TDamageProps,
  TGetPowerOptions,
  TGetPowerWithDamageTypeProps,
} from "../interface/petStatus.interface";
import { PetAttributes } from "./petAttributes";

export class PetStatus implements IPetStatus {
  private baseStatus: IPetStatusAttributes;
  currentStatus: IPetStatusAttributes;
  constructor(props: IPetStatusAttributes) {
    this.baseStatus = props;
    this.currentStatus = props;
  }
  getSpeed(options?: TGetPowerOptions): number {
    if (options?.bonus) {
      return Math.floor(this.currentStatus.speed * options.bonus);
    }
    return this.currentStatus.speed;
  }

  getAttack(props: TGetPowerWithDamageTypeProps): number {
    let output = 0;
    switch (props.type) {
      case DamageType.physical:
        output = this.currentStatus.physicalAttack;
        break;
      case DamageType.magic:
        output = this.currentStatus.magicAttack;
        break;
      case DamageType.real:
        output = Math.floor(
          (this.currentStatus.physicalAttack + this.currentStatus.magicAttack) *
            0.5
        );
        break;
    }
    if (props.bonus) {
      output = Math.floor(output * props.bonus);
    }
    return output;
  }
  getDefense(props: TGetPowerWithDamageTypeProps): number {
    let output = 0;
    switch (props.type) {
      case DamageType.physical:
        output = this.currentStatus.physicalDefense;
        break;
      case DamageType.magic:
        output = this.currentStatus.magicaDefense;
        break;
      case DamageType.real:
        output = Math.floor(
          (this.currentStatus.physicalDefense +
            this.currentStatus.magicaDefense) *
            0.25
        );
        break;
    }
    if (props.bonus) {
      output = Math.floor(output * props.bonus);
    }
    return output;
  }
  getHealing(options?: TGetPowerOptions): number {
    if (options?.bonus) {
      return Math.floor(this.baseStatus.health * 0.2 * options.bonus);
    }
    return Math.floor(this.baseStatus.health * 0.2);
  }
  getResting(options?: TGetPowerOptions): number {
    if (options?.bonus) {
      return Math.floor(this.baseStatus.stamina * 0.2 * options.bonus);
    }
    return Math.floor(this.baseStatus.stamina * 0.2);
  }
  getDodging(options?: TGetPowerOptions): number {
    if (options?.bonus) {
      return Math.floor(this.currentStatus.dodge * options.bonus);
    }
    return this.currentStatus.dodge;
  }
  getAcurency(options?: TGetPowerOptions): number {
    if (options?.bonus) {
      return Math.floor(this.currentStatus.acurency * options.bonus);
    }
    return this.currentStatus.acurency;
  }

  damage(props: TDamageProps): number {
    const defense = this.getDefense({
      type: props.type,
      bonus: props.defBonus,
    });
    const damage = props.amount - defense;
    if (damage <= 0) {
      return 1;
    }
    this.currentStatus.health -= damage;
    if (this.currentStatus.health <= 0) {
      this.currentStatus.health = 0;
    }
    return damage;
  }

  heal(seed: number): number {
    const healing = this.getHealing();
    const heal = Math.floor(seed * healing);
    this.currentStatus.health += heal;
    if (this.currentStatus.health > this.baseStatus.health) {
      this.currentStatus.health = this.baseStatus.health;
    }
    return heal;
  }

  rest(seed: number): number {
    const rest = this.getResting();
    const stamina = Math.floor(seed * rest);
    this.currentStatus.stamina += stamina;
    if (this.currentStatus.stamina > this.baseStatus.stamina) {
      this.currentStatus.stamina = this.baseStatus.stamina;
    }
    return stamina;
  }

  spendStamina(amount: number): number {
    this.currentStatus.stamina -= amount;
    if (this.currentStatus.stamina < 0) {
      this.currentStatus.stamina = 0;
    }
    return amount;
  }

  static create(attributes: PetAttributes): PetStatus {
    return new PetStatus({
      health: this.calcHealth(attributes),
      stamina: this.calcStamina(attributes),
      physicalAttack: this.calcPhysicalAttack(attributes),
      magicAttack: this.calcMagicAttack(attributes),
      physicalDefense: this.calcPhysicalDefense(attributes),
      magicaDefense: this.calcMagicaDefense(attributes),
      speed: this.calcSpeed(attributes),
      acurency: this.calcAcurency(attributes),
      dodge: this.calcDodge(attributes),
    });
  }

  private static calcHealth(attributes: IPetAttributes) {
    const { vitality, dexterity } = attributes;
    const minHealth = 20;
    const baseHealth = minHealth + vitality * 5 + Math.round(dexterity / 5);
    return Math.round(
      baseHealth + baseHealth * (Math.floor(vitality / 10) / 100)
    );
  }

  private static calcStamina(attributes: IPetAttributes): number {
    const { intelligence, dexterity } = attributes;
    const min = 20;
    const base = min + intelligence * 5 + Math.round(dexterity / 5);
    return Math.round(base + base * (Math.floor(intelligence / 10) / 100));
  }

  private static calcPhysicalAttack(attributes: IPetAttributes): number {
    const { strength, dexterity } = attributes;
    const min = 1;
    const base = min + strength * 1 + Math.round(dexterity / 5);
    return Math.round(base + base * (Math.floor(strength / 10) / 100));
  }

  private static calcMagicAttack(attributes: IPetAttributes): number {
    const { intelligence, dexterity } = attributes;
    const min = 1;
    const base = min + intelligence * 5 + Math.round(dexterity / 5);
    return Math.round(base + base * (Math.floor(intelligence / 10) / 100));
  }

  private static calcPhysicalDefense(attributes: PetAttributes): number {
    const { vitality, dexterity, strength } = attributes;
    const min = 1;
    const base =
      min + vitality * 1 + Math.round(dexterity / 4) + Math.round(strength / 3);
    return Math.round(base + base * (Math.floor(strength / 10) / 100));
  }

  private static calcMagicaDefense(attributes: PetAttributes): number {
    const { vitality, dexterity, intelligence } = attributes;
    const min = 1;
    const base =
      min +
      vitality * 1 +
      Math.round(dexterity / 4) +
      Math.round(intelligence / 3);
    return Math.round(base + base * (Math.floor(intelligence / 10) / 100));
  }

  private static calcSpeed(attributes: PetAttributes): number {
    const { agility, dexterity } = attributes;
    const min = 1;
    const base = min + agility * 5 + Math.round(dexterity / 6);
    return Math.round(base + base * (Math.floor(agility / 10) / 100));
  }

  private static calcAcurency(attributes: PetAttributes): number {
    const { dexterity, agility } = attributes;
    const min = 1;
    const base = min + dexterity * 5 + Math.round(agility / 6);
    return Math.round(base + base * (Math.floor(dexterity / 10) / 100));
  }

  private static calcDodge(attributes: PetAttributes): number {
    const { dexterity, agility } = attributes;
    const min = 1;
    const base = min + agility * 5 + Math.round(dexterity / 6);
    return Math.round(base + base * (Math.floor(agility / 10) / 100));
  }
}
