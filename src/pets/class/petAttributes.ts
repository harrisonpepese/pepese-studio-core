import { RandomService } from "../../common/services/random.service";
import { EPetTier } from "../enum/petTier.enum";
import { IPetAttributes } from "../interfaces/petAttributes.interface";

export interface IPetAttributesProps {
  tier: EPetTier;
}

export class PetAttributes implements IPetAttributes {
  constructor(props?: IPetAttributesProps) {
    if (props) {
      this.createBasicAttributes(props.tier);
      return;
    }
    this.createBasicAttributes(0);
  }
  strength: number;
  dexterity: number;
  agility: number;
  intelligence: number;
  vitality: number;
  lucky: number;

  private calcTierRange(tier: EPetTier) {
    const multiplier = tier + 1;
    const min = 1;
    const max = 6;

    return {
      min: min * multiplier,
      max: max * multiplier,
    };
  }

  private createBasicAttributes(tier: EPetTier) {
    const { min, max } = this.calcTierRange(tier);
    this.strength = RandomService.range(min, max);
    this.dexterity = RandomService.range(min, max);
    this.agility = RandomService.range(min, max);
    this.intelligence = RandomService.range(min, max);
    this.vitality = RandomService.range(min, max);
    this.lucky = RandomService.range(min, max);
  }
}
