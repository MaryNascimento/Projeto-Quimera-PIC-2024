import { model, Schema } from "mongoose";
import { WaterOptionsTypes } from "../types/water-options.schemas.types";

const WaterOptionsSchema = new Schema<WaterOptionsTypes>({
  value: { type: String, required: true },
  weigth: { type: Number, required: true },
  answerNumber: { type: Number, required: true },
});

export const WaterOptions = model<WaterOptionsTypes>(
  "WaterOptions",
  WaterOptionsSchema,
);
