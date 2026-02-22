import { WaterResponseTypes } from "./water-response.schemas.types";

export interface WaterResponseServiceTypes {
  createWaterResponse(
    waterResponse: WaterResponseTypes,
  ): Promise<WaterResponseTypes>;
  getWaterResponseByPin(pin: string): Promise<WaterResponseTypes[] | null>;
  getWaterResponseById(id: string): Promise<WaterResponseTypes | null>;
  updateWaterResponse(
    id: string,
    waterResponse: WaterResponseTypes,
  ): Promise<WaterResponseTypes | null>;
  deleteWaterResponse(id: string): Promise<void>;
}
