import { EActionType } from "../../common/enum/actionType.enum";

export interface IPetAction {
  id: string;
  name: string;
  type: EActionType;
  power: number;
  stamina: number;
  created_at: Date;
  updated_at: Date;
}
