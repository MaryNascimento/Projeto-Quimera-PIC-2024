import { model, Schema } from "mongoose";
import { IWaterExperiment } from "../interfaces/models/IWaterExperiment";

const WaterExperimentSchema = new Schema<IWaterExperiment>({
  pin: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  liberateSend: { type: Boolean, default: false },
  liberateResult: { type: Boolean, default: false },
  responsesNumber: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const WaterExperiment = model<IWaterExperiment>(
  "WaterExperiment",
  WaterExperimentSchema
);
