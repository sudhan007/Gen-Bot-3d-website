import { Elysia, t } from "elysia";
import { RoboticIntelligenceModel } from "../../models/Robotic-Intelligence";

export const RoboticIntelligenceController = new Elysia({
  prefix: "/roboticintelligence",
})

  .get(
    "/content",
    async ({ set }) => {
      try {
        const result = await RoboticIntelligenceModel.find({});
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
        tags: ["RoboticIntelligence"],
        summary: "Get Robotic Intelligence",
        description: "Get Robotic Intelligence",
      },
    }
  );
