import { model, Schema } from "mongoose";

const RoboticIntelligenceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RoboticIntelligenceModel = model(
  "RoboticIntelligence",
  RoboticIntelligenceSchema
);
