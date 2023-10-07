import { IPet } from "../../pets/interface/pet.interface";
import { IBasePlayer } from "./basePlayer.interface";

export interface IBattlePetGamePlayer extends IBasePlayer {
  pets: IPet[];
}
