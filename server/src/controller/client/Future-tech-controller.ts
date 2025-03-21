import { Elysia, t } from "elysia";
import { FutureTechModel } from "../../models/Future-tech";

export const FutureTechController = new Elysia({
  prefix: "/futuretech",
})

  .get(
    "/content",
    async ({ set }) => {
      try {
        const data = await FutureTechModel.findOne();

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
        tags: ["FutureTech"],
        description: "Get FutureTech content",
        summary: "Get Content",
      },
    }
  );
