import { WaterOptionsTypes } from "./water-options.schemas.types";

export interface WaterOptionsServiceTypes {
  createWaterOption(waterOption: WaterOptionsTypes): Promise<WaterOptionsTypes>;
  getWaterOptionById(id: string): Promise<WaterOptionsTypes | null>;
  getWaterOptionByAnswerNumber(
    answerNumber: number,
  ): Promise<WaterOptionsTypes[] | null>;
  getAllWaterOption(): Promise<WaterOptionsTypes[]>;
  updateWaterOption(
    id: string,
    waterOption: WaterOptionsTypes,
  ): Promise<WaterOptionsTypes | null>;
  deleteWaterOption(id: string): Promise<void>;
}
