import { WaterExperimentTypes } from "./water-experiment.schemas.types";

export interface WaterExperimentRepositoryTypes {
  create(waterExperiment: WaterExperimentTypes): Promise<WaterExperimentTypes>;
  findById(id: string): Promise<WaterExperimentTypes | null>;
  findByPin(pin: string): Promise<WaterExperimentTypes | null>;
  findByTeacher(teacherId: string): Promise<WaterExperimentTypes[]>;
  update(
    id: string,
    waterExperiment: WaterExperimentTypes,
  ): Promise<WaterExperimentTypes | null>;
  delete(id: string): Promise<void>;
}
