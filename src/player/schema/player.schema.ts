import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IBattlePetGamePlayer } from "../interface/battlePetGamePlayer.interface";
import { IPet } from "../../pets";

export type PlayerDocument = PlayerModel & Document;

@Schema()
export class PlayerModel implements IBattlePetGamePlayer {
  @Prop({ _id: true })
  id: string;
  @Prop()
  accountId: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
  @Prop({ default: Date.now })
  lastLogin: Date;
  @Prop({ default: 0 })
  gameCoin: number;
  @Prop({ default: [] })
  pets: IPet[];
  isOnline: boolean;

  addGameCoin(amount: number) {
    this.gameCoin += amount;
  }

  reduceGameCoin(amount: number) {
    this.gameCoin -= amount;
  }
}

export const PlayerSchema = SchemaFactory.createForClass(PlayerModel);
