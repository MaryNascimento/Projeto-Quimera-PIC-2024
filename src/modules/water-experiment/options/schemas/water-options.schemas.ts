import { model, Schema } from "mongoose";
import { WaterOptionsTypes } from "../types/water-options.schemas.types";

const WaterOptionsSchema = new Schema<WaterOptionsTypes>({
  value: { type: String, required: true },
  weight: { type: Number, required: true },
  answerNumber: { type: Number, required: true },
});

export const WaterOptions = model<WaterOptionsTypes>(
  "WaterOptions",
  WaterOptionsSchema,
);
