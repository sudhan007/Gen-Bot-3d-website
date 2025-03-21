import { Elysia, t } from "elysia";
import { RobotFeaturesModel } from "../../models/Robot-features";

export const RobotFeaturesController = new Elysia({
  prefix: "/robotfeatures",
})
  .get(
    "/content",
    async ({ set }) => {
      try {
        const result = await RobotFeaturesModel.find({});
        set.status = 200;
        return {
          data: result,
        };
      } catch (error: any) {
        set.status = 500;
        return { error: error.message };
      }
    },
    {
      detail: {
        tags: ["Robot features"],
        summary: "Get Robotic Intelligence",
        description: "Get Robotic Intelligence",
      },
    }
  );
