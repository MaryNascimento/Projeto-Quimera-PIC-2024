import { WaterOptionsTypes } from "../../options/types/water-options.schemas.types";
import { Types } from "mongoose";

export interface WaterResponseTypes {
  studentName: string;
  pin: string;
  // stored as ObjectId refs in the database, but may be populated to WaterOptionsTypes
  answerOne: WaterOptionsTypes | Types.ObjectId | string;
  answerTwo: WaterOptionsTypes | Types.ObjectId | string;
  score: number;
}
