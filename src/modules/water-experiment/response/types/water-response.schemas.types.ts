import { WaterOptionsTypes } from "../../options/types/water-options.schemas.types";

export interface WaterResponseTypes {
  studentName: string;
  pin: string;
  answerOne: WaterOptionsTypes;
  answerTwo: WaterOptionsTypes;
  score: number;
}
