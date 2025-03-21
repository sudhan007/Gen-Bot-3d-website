import { Elysia, t } from "elysia";
import { HomePageModel } from "../../models/Home";

export const HomeController = new Elysia({
  prefix: "/homepage",
})

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
