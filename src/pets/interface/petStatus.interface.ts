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

export interface IPetStatus {
  baseStatus: IPetStatusAttributes;
  currentStatus: IPetStatusAttributes;
}
