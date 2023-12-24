import { EDamageType } from "../../common/enum/damageType.enum";
import { IPetAttributes } from "../interfaces/petAttributes.interface";
import {
  IPetStatus,
  IPetStatusAttributes,
  TDamageProps,
  TGetPowerOptions,
  TGetPowerWithDamageTypeProps,
} from "../interfaces/petStatus.interface";

export class PetStatus implements IPetStatus {
  private baseStatus: IPetStatusAttributes;
  currentStatus: IPetStatusAttributes;
  constructor(props: IPetAttributes) {
    this.baseStatus = this.create(props);
    this.currentStatus = { ...this.baseStatus };
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
      case EDamageType.physical:
        output = this.currentStatus.physicalAttack;
        break;
      case EDamageType.magic:
        output = this.currentStatus.magicAttack;
        break;
      case EDamageType.real:
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
      case EDamageType.physical:
        output = this.currentStatus.physicalDefense;
        break;
      case EDamageType.magic:
        output = this.currentStatus.magicaDefense;
        break;
      case EDamageType.real:
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
    let output = 0;
    output = Math.floor(this.baseStatus.health * 0.2);
    if (options?.bonus) {
      output = Math.floor(output * options.bonus);
    }
    return output;
  }

  getResting(options?: TGetPowerOptions): number {
    let output = 0;
    output = Math.floor(this.baseStatus.stamina * 0.2);
    if (options?.bonus) {
      output = Math.floor(output * options.bonus);
    }
    return output;
  }

  getDodging(options?: TGetPowerOptions): number {
    let output = 0;
    output = this.currentStatus.dodge;
    if (options?.bonus) {
      output = Math.floor(output * options.bonus);
    }
    return output;
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

    let damage = props.amount - defense;
    if (damage <= 0) {
      damage = 1;
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

  private create(attributes: IPetAttributes): IPetStatusAttributes {
    return {
      health: this.calcHealth(attributes),
      stamina: this.calcStamina(attributes),
      physicalAttack: this.calcPhysicalAttack(attributes),
      magicAttack: this.calcMagicAttack(attributes),
      physicalDefense: this.calcPhysicalDefense(attributes),
      magicaDefense: this.calcMagicaDefense(attributes),
      speed: this.calcSpeed(attributes),
      acurency: this.calcAcurency(attributes),
      dodge: this.calcDodge(attributes),
    };
  }

  private calcHealth(attributes: IPetAttributes) {
    const { vitality, dexterity } = attributes;
    const minHealth = 20;
    const baseHealth = minHealth + vitality * 5 + Math.round(dexterity / 5);
    return Math.round(
      baseHealth + baseHealth * (Math.floor(vitality / 10) / 100)
    );
  }

  private calcStamina(attributes: IPetAttributes): number {
    const { intelligence, dexterity } = attributes;
    const min = 20;
    const base = min + intelligence * 5 + Math.round(dexterity / 5);
    return Math.round(base + base * (Math.floor(intelligence / 10) / 100));
  }

  private calcPhysicalAttack(attributes: IPetAttributes): number {
    const { strength, dexterity } = attributes;
    const min = 1;
    const base = min + strength * 1 + Math.round(dexterity / 5);
    return Math.round(base + base * (Math.floor(strength / 10) / 100));
  }

  private calcMagicAttack(attributes: IPetAttributes): number {
    const { intelligence, dexterity } = attributes;
    const min = 1;
    const base = min + intelligence * 5 + Math.round(dexterity / 5);
    return Math.round(base + base * (Math.floor(intelligence / 10) / 100));
  }

  private calcPhysicalDefense(attributes: IPetAttributes): number {
    const { vitality, dexterity, strength } = attributes;
    const min = 1;
    const base =
      min + vitality * 1 + Math.round(dexterity / 4) + Math.round(strength / 3);
    return Math.round(base + base * (Math.floor(strength / 10) / 100));
  }

  private calcMagicaDefense(attributes: IPetAttributes): number {
    const { vitality, dexterity, intelligence } = attributes;
    const min = 1;
    const base =
      min +
      vitality * 1 +
      Math.round(dexterity / 4) +
      Math.round(intelligence / 3);
    return Math.round(base + base * (Math.floor(intelligence / 10) / 100));
  }

  private calcSpeed(attributes: IPetAttributes): number {
    const { agility, dexterity } = attributes;
    const min = 1;
    const base = min + agility * 5 + Math.round(dexterity / 6);
    return Math.round(base + base * (Math.floor(agility / 10) / 100));
  }

  private calcAcurency(attributes: IPetAttributes): number {
    const { dexterity, agility } = attributes;
    const min = 1;
    const base = min + dexterity * 5 + Math.round(agility / 6);
    return Math.round(base + base * (Math.floor(dexterity / 10) / 100));
  }

  private calcDodge(attributes: IPetAttributes): number {
    const { dexterity, agility } = attributes;
    const min = 1;
    const base = min + agility * 5 + Math.round(dexterity / 6);
    return Math.round(base + base * (Math.floor(agility / 10) / 100));
  }
}
