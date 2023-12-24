import { EElementType, EHabitatType } from "../../common/enum";
import { EPetTier } from "../enum";
import { IPet, IPetAttributes } from "../interfaces";
import { Pet } from "./pet";
const petAttributes: IPetAttributes = {
  strength: 1,
  dexterity: 1,
  agility: 1,
  intelligence: 1,
  vitality: 1,
  lucky: 1,
};
const petProps: IPet = {
  id: "id",
  name: "pet",
  playerId: "playerId",
  tier: EPetTier.common,
  habitat: EHabitatType.ground,
  elemet: EElementType.fire,
  baseAttributes: petAttributes,
  currentAttributes: petAttributes,
  level: 1,
  attributePoints: 1,
  avaliableAttributePoints: 1,
  experience: 0,
};

describe("Pet tests", () => {
  let pet: Pet;
  beforeEach(() => {
    pet = new Pet(petProps);
  });

  it("should create a pet", () => {
    expect(pet).toBeDefined();
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.id).toEqual(petProps.id);
    expect(pet.name).toEqual(petProps.name);
    expect(pet.playerId).toEqual(petProps.playerId);
    expect(pet.tier).toEqual(petProps.tier);
    expect(pet.habitat).toEqual(petProps.habitat);
    expect(pet.elemet).toEqual(petProps.elemet);
    expect(pet.baseAttributes).toEqual(petProps.baseAttributes);
    expect(pet.currentAttributes).toEqual(petProps.currentAttributes);
    expect(pet.level).toEqual(petProps.level);
    expect(pet.attributePoints).toEqual(petProps.attributePoints);
    expect(pet.avaliableAttributePoints).toEqual(
      petProps.avaliableAttributePoints
    );
  });

  it("should gain experience and not level up", () => {
    const experience = 10;
    pet.gainExperience(experience);
    expect(pet.experience).toEqual(experience);
  });

  it("should gain experience and level up", () => {
    jest.spyOn(pet, "levelUp");
    const experience = 100;
    pet.gainExperience(experience);
    expect(pet.experience).toEqual(0);
    expect(pet.levelUp).toHaveBeenCalled();
    expect(pet.level).toBe(2);
  });

  it("should gain experience and level up 2 lvl", () => {
    jest.spyOn(pet, "levelUp");
    const experience = 300;
    pet.gainExperience(experience);
    expect(pet.experience).toEqual(0);
    expect(pet.levelUp).toHaveBeenCalledTimes(2);
  });

  it("should level up", () => {
    pet.levelUp();
    expect(pet.level).toBe(2);
    expect(pet.attributePoints).toBe(2);
    expect(pet.avaliableAttributePoints).toBe(2);
    expect(pet.experience).toBe(0);
  });

  it("should calc experience to next level", () => {
    const currentLevel = 1;
    const currentExp = 10;
    const result = pet.calcExperienceToNextLevel(currentLevel, currentExp);
    expect(result).toBe(90);
  });

  it("should generate a pet", () => {
    const props = {
      name: "pet",
      playerId: "playerId",
      tier: EPetTier.common,
      habitat: EHabitatType.ground,
      elemet: EElementType.fire,
    };
    const pet = Pet.generate(props);
    expect(pet).toBeDefined();
    expect(pet).toBeInstanceOf(Pet);
    expect(pet.name).toEqual(props.name);
    expect(pet.playerId).toEqual(props.playerId);
    expect(pet.tier).toEqual(props.tier);
    expect(pet.habitat).toEqual(props.habitat);
    expect(pet.elemet).toEqual(props.elemet);
    expect(pet.level).toEqual(1);
    expect(pet.attributePoints).toEqual(0);
    expect(pet.avaliableAttributePoints).toEqual(0);
    expect(pet.experience).toEqual(0);
  });
});
