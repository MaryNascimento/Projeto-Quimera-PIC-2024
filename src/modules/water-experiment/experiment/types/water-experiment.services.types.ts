import { WaterExperimentTypes } from "./water-experiment.schemas.types";

export interface WaterExperimentServiceTypes {
  createWaterExperiment(
    waterExperiment: WaterExperimentTypes,
  ): Promise<WaterExperimentTypes>;
  getWaterExperimentById(id: string): Promise<WaterExperimentTypes | null>;
  getWaterExperimentByPin(pin: string): Promise<WaterExperimentTypes | null>;
  getWaterExperimentByTeacher(
    teacherId: string,
  ): Promise<WaterExperimentTypes[]>;
  updateWaterExperiment(
    id: string,
    waterExperiment: Partial<WaterExperimentTypes>,
    requesterId: string,
  ): Promise<WaterExperimentTypes | null>;
  deleteWaterExperiment(id: string, requesterId: string): Promise<void>;
}
