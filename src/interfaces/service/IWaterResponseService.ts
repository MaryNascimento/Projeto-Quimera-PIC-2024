import { IWaterResponse } from "../models/IWaterResponse";

export interface IWaterResponseService {
  createWaterResponse(waterResponse: IWaterResponse): Promise<IWaterResponse>;
  getWaterResponseByPin(pin: string): Promise<IWaterResponse[] | null>;
  getWaterResponseById(id: string): Promise<IWaterResponse | null>;
  updateWaterResponse(
    id: string,
    waterResponse: IWaterResponse
  ): Promise<IWaterResponse | null>;
  deleteWaterResponse(id: string): Promise<void>;
}
