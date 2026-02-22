import { model, Schema } from "mongoose";
import { WaterExperimentTypes } from "../types/water-experiment.schemas.types";

const WaterExperimentSchema = new Schema<WaterExperimentTypes>({
  pin: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  liberateSend: { type: Boolean, default: false },
  liberateResult: { type: Boolean, default: false },
  responsesNumber: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const WaterExperiment = model<WaterExperimentTypes>(
  "WaterExperiment",
  WaterExperimentSchema,
);
