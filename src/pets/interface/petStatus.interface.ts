import { DamageType } from "../../common";

export interface IPetStatusAttributes {
  health: number;
  stamina: number;
  physicalAttack: number;
  magicAttack: number;
  physicalDefense: number;
  magicaDefense: number;
  speed: number;
  acurency: number;
  dodge: number;
}
export type TDamageProps = {
  amount: number;
  type: DamageType;
  defBonus?: number;
};
export type TGetPowerOptions = {
  bonus: number;
};
export type TGetPowerWithDamageTypeProps = {
  type: DamageType;
} & TGetPowerOptions;
export interface IPetStatus {
  currentStatus: IPetStatusAttributes;
  getAttack(props: TGetPowerWithDamageTypeProps): number;
  getDefense(props: TGetPowerWithDamageTypeProps): number;
  getHealing(options?: TGetPowerOptions): number;
  getResting(options?: TGetPowerOptions): number;
  getDodging(options?: TGetPowerOptions): number;
  getAcurency(options?: TGetPowerOptions): number;
  getSpeed(options?: TGetPowerOptions): number;
  damage(props: TDamageProps): number;
  heal(seed: number): number;
  rest(seed: number): number;
  spendStamina(amount: number): number;
}
