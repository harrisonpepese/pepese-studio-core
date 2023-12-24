import { EElementType, EHabitatType } from "../../common/enum";
import { EPetTier } from "../enum/petTier.enum";
import { IPet } from "../interfaces/pet.interface";
import { PetAttributes } from "./petAttributes";
import { PetStatus } from "./petStatus";

export type TPetCreateProps = Pick<
  Pet,
  "name" | "playerId" | "tier" | "habitat" | "elemet"
>;

export class Pet implements IPet {
  constructor(props?: IPet) {
    Object.assign(this, props);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = this.updatedAt || new Date();
    if (this.currentAttributes) {
      this.initStatus();
    }
  }

  id: string;
  name: string;
  playerId: string;
  tier: EPetTier;
  habitat: EHabitatType;
  elemet: EElementType;
  baseAttributes: PetAttributes;
  currentAttributes: PetAttributes;
  level: number = 1;
  attributePoints: number = 0;
  avaliableAttributePoints: number = 0;
  experience: number = 0;
  createdAt: Date;
  updatedAt: Date;
  status: PetStatus;

  initStatus() {
    this.status = new PetStatus(this.currentAttributes);
  }

  gainExperience(experience: number) {
    const expToNextLevel = this.calcExperienceToNextLevel(
      this.level,
      this.experience
    );
    if (experience >= expToNextLevel) {
      this.levelUp();
      experience -= expToNextLevel;
      if (experience > 0) return this.gainExperience(experience);
    }
    this.experience += experience;
  }

  levelUp() {
    this.level++;
    const attributePoints = Math.floor(this.level / 10 + 1);
    this.attributePoints += attributePoints;
    this.avaliableAttributePoints += attributePoints;
    this.experience = 0;
  }

  calcExperienceToNextLevel(currentLevel: number, currentExp: number) {
    return Math.floor(100 * currentLevel) - currentExp;
  }

  static generate(props: TPetCreateProps) {
    const pet = new Pet();
    pet.name = props.name;
    pet.playerId = props.playerId;
    pet.habitat = props.habitat;
    pet.tier = props.tier;
    pet.elemet = props.elemet;
    pet.baseAttributes = new PetAttributes({ tier: props.tier });
    pet.currentAttributes = pet.baseAttributes;
    pet.createdAt = new Date();
    pet.updatedAt = new Date();
    pet.initStatus();
    return pet;
  }
}
