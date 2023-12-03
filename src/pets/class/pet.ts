import { EHabitatType, EElementType } from "../../common";
import { EPetTier } from "../enum/petTier.enum";
import { IPet } from "../interface/pet.interface";
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
  level: number;
  attributePoints: number;
  avaliableAttributePoints: number;
  experience: number;
  createdAt: Date;
  updatedAt: Date;
  status: PetStatus;

  initStatus() {
    this.status = PetStatus.create(this.currentAttributes);
  }

  gainExperience(experience: number) {
    const expToNextLevel = this.calcExperienceToNextLevel(
      this.level,
      this.experience
    );
    this.experience += experience;
    if (this.experience >= expToNextLevel) {
      this.levelUp();
      this.gainExperience(this.experience - expToNextLevel);
    }
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
    pet.habitat = props.habitat;
    pet.elemet = props.elemet;
    pet.playerId = props.playerId;
    pet.tier = props.tier;
    pet.level = 1;
    pet.baseAttributes = new PetAttributes({ tier: props.tier });
    pet.currentAttributes = pet.baseAttributes;
    pet.createdAt = new Date();
    pet.updatedAt = new Date();
    pet.initStatus();
    return pet;
  }
}
