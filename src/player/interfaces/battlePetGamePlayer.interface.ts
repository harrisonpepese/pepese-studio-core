import { IBaseEntity } from "../../common/entity/baseEntity.interface";
import { IPet } from "../../pets/interfaces/pet.interface";
import { IBasePlayer } from "./basePlayer.interface";

export interface IBattlePetGamePlayer extends IBasePlayer, IBaseEntity {
  pets: IPet[];
}
