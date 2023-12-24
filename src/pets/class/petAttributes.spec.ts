import { EPetTier } from "../enum";
import { PetAttributes } from "./petAttributes";

describe("PetAttributes", () => {
  it("should create a pet attributes", () => {
    const petAttributes = new PetAttributes();
    expect(petAttributes).toBeDefined();
    expect(petAttributes).toBeInstanceOf(PetAttributes);
    expect(petAttributes.strength).toBeDefined();
    expect(petAttributes.dexterity).toBeDefined();
    expect(petAttributes.agility).toBeDefined();
    expect(petAttributes.intelligence).toBeDefined();
    expect(petAttributes.vitality).toBeDefined();
    expect(petAttributes.lucky).toBeDefined();
  });
  it("should create a pet attributes with tier 0", () => {
    const petAttributes = new PetAttributes({ tier: EPetTier.common });
    expect(petAttributes).toBeDefined();
    expect(petAttributes).toBeInstanceOf(PetAttributes);
    expect(petAttributes.strength).toBeGreaterThanOrEqual(1);
    expect(petAttributes.strength).toBeLessThanOrEqual(6);
    expect(petAttributes.dexterity).toBeGreaterThanOrEqual(1);
    expect(petAttributes.dexterity).toBeLessThanOrEqual(6);
    expect(petAttributes.agility).toBeGreaterThanOrEqual(1);
    expect(petAttributes.agility).toBeLessThanOrEqual(6);
    expect(petAttributes.intelligence).toBeGreaterThanOrEqual(1);
    expect(petAttributes.intelligence).toBeLessThanOrEqual(6);
    expect(petAttributes.vitality).toBeGreaterThanOrEqual(1);
    expect(petAttributes.vitality).toBeLessThanOrEqual(6);
    expect(petAttributes.lucky).toBeGreaterThanOrEqual(1);
    expect(petAttributes.lucky).toBeLessThanOrEqual(6);
  });

  it("should create a pet attributes with tier 1", () => {
    const petAttributes = new PetAttributes({ tier: EPetTier.uncommon });
    expect(petAttributes).toBeDefined();
    expect(petAttributes).toBeInstanceOf(PetAttributes);
    expect(petAttributes.strength).toBeGreaterThanOrEqual(2);
    expect(petAttributes.strength).toBeLessThanOrEqual(12);
    expect(petAttributes.dexterity).toBeGreaterThanOrEqual(2);
    expect(petAttributes.dexterity).toBeLessThanOrEqual(12);
    expect(petAttributes.agility).toBeGreaterThanOrEqual(2);
    expect(petAttributes.agility).toBeLessThanOrEqual(12);
    expect(petAttributes.intelligence).toBeGreaterThanOrEqual(2);
    expect(petAttributes.intelligence).toBeLessThanOrEqual(12);
    expect(petAttributes.vitality).toBeGreaterThanOrEqual(2);
    expect(petAttributes.vitality).toBeLessThanOrEqual(12);
    expect(petAttributes.lucky).toBeGreaterThanOrEqual(2);
    expect(petAttributes.lucky).toBeLessThanOrEqual(12);
  });

  it("should create a pet attributes with tier 2", () => {
    const petAttributes = new PetAttributes({ tier: EPetTier.rare });
    expect(petAttributes).toBeDefined();
    expect(petAttributes).toBeInstanceOf(PetAttributes);
    expect(petAttributes.strength).toBeGreaterThanOrEqual(3);
    expect(petAttributes.strength).toBeLessThanOrEqual(18);
    expect(petAttributes.dexterity).toBeGreaterThanOrEqual(3);
    expect(petAttributes.dexterity).toBeLessThanOrEqual(18);
    expect(petAttributes.agility).toBeGreaterThanOrEqual(3);
    expect(petAttributes.agility).toBeLessThanOrEqual(18);
    expect(petAttributes.intelligence).toBeGreaterThanOrEqual(3);
    expect(petAttributes.intelligence).toBeLessThanOrEqual(18);
    expect(petAttributes.vitality).toBeGreaterThanOrEqual(3);
    expect(petAttributes.vitality).toBeLessThanOrEqual(18);
    expect(petAttributes.lucky).toBeGreaterThanOrEqual(3);
    expect(petAttributes.lucky).toBeLessThanOrEqual(18);
  });

  it("should create a pet attributes with tier 3", () => {
    const petAttributes = new PetAttributes({ tier: EPetTier.epic });
    expect(petAttributes).toBeDefined();
    expect(petAttributes).toBeInstanceOf(PetAttributes);
    expect(petAttributes.strength).toBeGreaterThanOrEqual(4);
    expect(petAttributes.strength).toBeLessThanOrEqual(24);
    expect(petAttributes.dexterity).toBeGreaterThanOrEqual(4);
    expect(petAttributes.dexterity).toBeLessThanOrEqual(24);
    expect(petAttributes.agility).toBeGreaterThanOrEqual(4);
    expect(petAttributes.agility).toBeLessThanOrEqual(24);
    expect(petAttributes.intelligence).toBeGreaterThanOrEqual(4);
    expect(petAttributes.intelligence).toBeLessThanOrEqual(24);
    expect(petAttributes.vitality).toBeGreaterThanOrEqual(4);
    expect(petAttributes.vitality).toBeLessThanOrEqual(24);
    expect(petAttributes.lucky).toBeGreaterThanOrEqual(4);
    expect(petAttributes.lucky).toBeLessThanOrEqual(24);
  });

  it("should create a pet attributes with tier 4", () => {
    const petAttributes = new PetAttributes({ tier: EPetTier.legendary });
    expect(petAttributes).toBeDefined();
    expect(petAttributes).toBeInstanceOf(PetAttributes);
    expect(petAttributes.strength).toBeGreaterThanOrEqual(5);
    expect(petAttributes.strength).toBeLessThanOrEqual(30);
    expect(petAttributes.dexterity).toBeGreaterThanOrEqual(5);
    expect(petAttributes.dexterity).toBeLessThanOrEqual(30);
    expect(petAttributes.agility).toBeGreaterThanOrEqual(5);
    expect(petAttributes.agility).toBeLessThanOrEqual(30);
    expect(petAttributes.intelligence).toBeGreaterThanOrEqual(5);
    expect(petAttributes.intelligence).toBeLessThanOrEqual(30);
    expect(petAttributes.vitality).toBeGreaterThanOrEqual(5);
    expect(petAttributes.vitality).toBeLessThanOrEqual(30);
    expect(petAttributes.lucky).toBeGreaterThanOrEqual(5);
    expect(petAttributes.lucky).toBeLessThanOrEqual(30);
  });
});
