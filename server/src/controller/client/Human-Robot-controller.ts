import { Elysia, t } from "elysia";
import { HumanRobotModel } from "../../models/Human-Robot";

export const HumanRobotController = new Elysia({
  prefix: "/humanrobot",
})

  .get(
    "/content",
    async ({ set }) => {
      try {
        const data = await HumanRobotModel.findOne();

        if (!data) {
          set.status = 400;
          return { error: "Content not found" };
        }
        set.status = 200;

        return {
          data,
        };
      } catch (error: any) {
        set.status = 500;
        return { error: error.message };
      }
    },
    {
      detail: {
        tags: ["HumanRobot"],
        description: "Get About page content",
        summary: "Get Content",
      },
    }
  );
