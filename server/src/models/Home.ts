import { model, Schema } from "mongoose";

const HomeSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const HomePageModel = model("Homecontent", HomeSchema);
