import { Elysia, t } from "elysia";
import { AboutPageModel } from "../../models/About";

export const AboutController = new Elysia({
  prefix: "/aboutpage",
})
  .get(
    "/content",
    async ({ set }) => {
      try {
        const data = await AboutPageModel.findOne();

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
        tags: ["Aboutpage"],
        description: "Get About page content",
        summary: "Get Content",
      },
    }
  );
