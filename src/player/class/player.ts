import { IPet } from "../../pets/interfaces";
import { IBattlePetGamePlayer } from "../interfaces/battlePetGamePlayer.interface";

export class Player implements IBattlePetGamePlayer {
  constructor(props: IBattlePetGamePlayer) {
    Object.assign(this, props);
  }
  id: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  gameCoin: number;
  pets: IPet[];
  isOnline: boolean;

  addGameCoin(amount: number) {
    this.gameCoin += amount;
  }

  reduceGameCoin(amount: number) {
    this.gameCoin -= amount;
  }
}
