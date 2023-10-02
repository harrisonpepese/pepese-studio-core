import { EPetActionType } from "../enum/petActionType.enum";

export interface IPetAction {
    id: string;
    name: string;
    type: EPetActionType;
    power: number;
    stamina: number;
    created_at: Date;
    updated_at: Date;
}