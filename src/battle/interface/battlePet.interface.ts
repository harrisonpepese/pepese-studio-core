import { PetStatus } from "../../pets";

export interface IBattlePet {
  playerId: string;
  petId: string;
  status: PetStatus;
}
