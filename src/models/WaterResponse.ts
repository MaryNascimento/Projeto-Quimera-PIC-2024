import { model, Schema } from "mongoose";
import { IWaterResponse } from "../interfaces/models/IWaterResponse";
import { WaterExperiment } from "./WaterExperiment";

const WaterResponseSchema = new Schema<IWaterResponse>({
  studentName: { type: String, required: true },
  pin: { type: String, required: true },
  answerOne: { type: Schema.Types.ObjectId, ref: "WaterOption" },
  answerTwo: { type: Schema.Types.ObjectId, ref: "WaterOption" },
  score: { type: Number, required: true },
});

WaterResponseSchema.post("save", async function (doc) {
  await WaterExperiment.updateOne(
    { pin: doc.pin },
    { $inc: { responsesNumber: 1 } }
  );
});

WaterResponseSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await WaterExperiment.updateOne(
      { pin: doc.pin },
      { $inc: { responsesNumber: -1 } }
    );
  }
});

export const WaterResponse = model<IWaterResponse>(
  "WaterResponse",
  WaterResponseSchema
);
