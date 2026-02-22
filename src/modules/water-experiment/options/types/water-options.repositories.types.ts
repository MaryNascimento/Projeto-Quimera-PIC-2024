import { WaterOptionsTypes } from "./water-options.schemas.types";

export interface WaterOptionsRepositoryTypes {
  create(waterOption: WaterOptionsTypes): Promise<WaterOptionsTypes>;
  findById(id: string): Promise<WaterOptionsTypes | null>;
  findByAnswerNumber(answerNumber: number): Promise<WaterOptionsTypes[] | null>;
  findAll(): Promise<WaterOptionsTypes[]>;
  update(
    id: string,
    waterOption: WaterOptionsTypes,
  ): Promise<WaterOptionsTypes | null>;
  delete(id: string): Promise<void>;
}
