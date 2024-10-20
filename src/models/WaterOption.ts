import { model, Schema } from "mongoose";
import { IWaterOption } from "../interfaces/models/IWaterOptions";

const WaterOptionSchema = new Schema<IWaterOption>({
  value: { type: String, required: true },
  weigth: { type: Number, required: true },
  answerNumber: { type: Number, required: true },
});

export const WaterOption = model<IWaterOption>(
  "WaterOption",
  WaterOptionSchema
);
