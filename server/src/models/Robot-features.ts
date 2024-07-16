import { model, Schema } from "mongoose";

const RobotFeaturesSchema = new Schema(
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

export const RobotFeaturesModel = model("RobotFeatures", RobotFeaturesSchema);
