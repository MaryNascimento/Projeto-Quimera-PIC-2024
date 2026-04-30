import { model, Schema } from "mongoose";
import { WaterResponseTypes } from "../types/water-response.schemas.types";
import { WaterExperiment } from "../../experiment/schemas/water-experiment.schemas";

const WaterResponseSchema = new Schema<WaterResponseTypes>({
  studentName: { type: String, required: true },
  pin: { type: String, required: true },
  answerOne: { type: Schema.Types.ObjectId, ref: "WaterOptions" },
  answerTwo: { type: Schema.Types.ObjectId, ref: "WaterOptions" },
  score: { type: Number, required: true },
});

WaterResponseSchema.post("save", async function (doc) {
  await WaterExperiment.updateOne(
    { pin: doc.pin },
    { $inc: { responsesNumber: 1 } },
  );
});

WaterResponseSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await WaterExperiment.updateOne(
      { pin: doc.pin },
      { $inc: { responsesNumber: -1 } },
    );
  }
});

export const WaterResponse = model<WaterResponseTypes>(
  "WaterResponse",
  WaterResponseSchema,
);
