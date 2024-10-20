import { IWaterExperiment } from "../models/IWaterExperiment";

export interface IWaterExperimentRepository {
  create(waterExperiment: IWaterExperiment): Promise<IWaterExperiment>;
  findById(id: string): Promise<IWaterExperiment | null>;
  findByPin(pin: string): Promise<IWaterExperiment | null>;
  findByTeacher(teacherId: string): Promise<IWaterExperiment[]>;
  update(
    id: string,
    waterExperiment: IWaterExperiment
  ): Promise<IWaterExperiment | null>;
  delete(id: string): Promise<void>;
}
