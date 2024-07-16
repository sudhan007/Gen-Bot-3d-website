import { model, Schema } from "mongoose";

const AboutSchema = new Schema(
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

export const AboutPageModel = model("AboutContent", AboutSchema);
