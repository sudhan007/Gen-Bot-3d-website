import { model, Schema } from "mongoose";

const FutureTechSchema = new Schema(
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

export const FutureTechModel = model("FutureTech", FutureTechSchema);
