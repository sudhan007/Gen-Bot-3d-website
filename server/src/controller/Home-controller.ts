import { Elysia, t } from "elysia";
import { HomePageModel } from "../models/Home";

export const HomeController = new Elysia({
  prefix: "/homepage",
})

  .post(
    "/create",
    async ({ body, set }) => {
      try {
        const { content } = body;

        if (!content) {
          set.status = 400;
          return { error: "Content is required" };
        }

        const result = await HomePageModel.findOneAndUpdate(
          {},
          { content, lastupdate: new Date() },
          { new: true, upsert: true }
        );

        set.status = 200;

        return {
          message: "Content created successfully",
          data: result.content,
        };
      } catch (error: any) {
        set.status = 500;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        content: t.String(),
      }),
      detail: {
        tags: ["Homepage"],
        description: "Create or update homepage content",
        summary: "Create/Update Content",
      },
    }
  )
  .get(
    "/content",
    async ({ set }) => {
      try {
        const data = await HomePageModel.findOne();

        if (!data) {
          set.status = 400;
          return { error: "Content not found" };
        }

        set.status = 200;

        return {
          data,
        };
      } catch (error: any) {
        console.log(error);
      }
    },
    {
      detail: {
        tags: ["Homepage"],
        summary: "Get Homepage Content",
        description: "Get Homepage Content",
      },
    }
  );
