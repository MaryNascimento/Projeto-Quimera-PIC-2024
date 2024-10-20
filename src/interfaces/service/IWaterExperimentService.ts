import { IWaterExperiment } from "../models/IWaterExperiment";

export interface IWaterExperimentService {
  createWaterExperiment(
    waterExperiment: IWaterExperiment
  ): Promise<IWaterExperiment>;
  getWaterExperimentById(id: string): Promise<IWaterExperiment | null>;
  getWaterExperimentByPin(pin: string): Promise<IWaterExperiment | null>;
  getWaterExperimentByTeacher(teacherId: string): Promise<IWaterExperiment[]>;
  updateWaterExperiment(
    id: string,
    waterExperiment: IWaterExperiment
  ): Promise<IWaterExperiment | null>;
  deleteWaterExperiment(id: string): Promise<void>;
}
