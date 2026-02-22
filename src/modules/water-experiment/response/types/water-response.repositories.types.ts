import { WaterResponseTypes } from "./water-response.schemas.types";

export interface WaterResponseRepositoryTypes {
  create(waterResponse: WaterResponseTypes): Promise<WaterResponseTypes>;
  findByPin(pin: string): Promise<WaterResponseTypes[] | null>;
  findById(id: string): Promise<WaterResponseTypes | null>;
  update(
    id: string,
    waterResponse: WaterResponseTypes,
  ): Promise<WaterResponseTypes | null>;
  delete(id: string): Promise<void>;
}
