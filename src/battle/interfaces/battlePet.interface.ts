import { PetStatus } from "../../pets/class";

export interface IBattlePet {
  playerId: string;
  petId: string;
  status: PetStatus;
}
