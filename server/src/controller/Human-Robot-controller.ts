import { Elysia, t } from "elysia";
import { HumanRobotModel } from "../models/Human-Robot";

export const HumanRobotController = new Elysia({
  prefix: "/humanrobot",
})

  .post(
    "/create",
    async ({ body, set }) => {
      try {
        const { content, title }: any = body;

        if (!content || !title) {
          set.status = 400;
          return { error: "All fields are required" };
        }

        const result = await HumanRobotModel.findOneAndUpdate(
          {},
          { content, title },
          { new: true, upsert: true }
        );

        set.status = 200;

        return {
          message: "Content created successfully",
          data: result,
        };
      } catch (error: any) {
        console.log(error);
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        content: t.String(),
        title: t.String(),
      }),
      detail: {
        tags: ["HumanRobot"],
        description: "Create or update About page",
        summary: "Create/Update Content",
      },
    }
  )
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
