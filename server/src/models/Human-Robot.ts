import { model, Schema } from "mongoose";

const HumanRobotSchema = new Schema(
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

export const HumanRobotModel = model("HumanRobot", HumanRobotSchema);
