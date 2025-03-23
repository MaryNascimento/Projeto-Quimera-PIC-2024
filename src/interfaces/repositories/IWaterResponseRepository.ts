import { IWaterResponse } from "../models/IWaterResponse";

export interface IWaterResponseRepository {
  create(waterResponse: IWaterResponse): Promise<IWaterResponse>;
  findByPin(pin: string): Promise<IWaterResponse[] | null>;
  findById(id: string): Promise<IWaterResponse | null>;
  update(
    id: string,
    waterResponse: IWaterResponse
  ): Promise<IWaterResponse | null>;
  delete(id: string): Promise<void>;
}
