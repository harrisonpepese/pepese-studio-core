import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IBattlePetGamePlayer } from "../interface/battlePetGamePlayer.interface";
import { IPet } from "../../pets";

@Schema()
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
