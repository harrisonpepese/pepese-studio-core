import { EElementType } from "../../common/enum/elementType.enum";
import { EHabitatType } from "../../common/enum/habitatType.enum";
import { IPetAttributes } from "./petAttributes.interface";

export interface IPet {
    id: string;
    name: string;
    habitat: EHabitatType;
    elemet: EElementType;
    level: number;
    baseAttributes: IPetAttributes;
    currentAttributes: IPetAttributes;
    attributePoints: number;
    experience: number;
    created_at: Date;
    updated_at: Date;
}