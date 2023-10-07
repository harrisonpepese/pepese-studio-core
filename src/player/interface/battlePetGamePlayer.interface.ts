import { IPet } from "../../pets/interface/pet.interface";
import { BasePlayer } from "./basePlayer.interface";

export interface BattlePetGamePlayer extends BasePlayer {
    pets: IPet[];
    gameCoins: number;
}
