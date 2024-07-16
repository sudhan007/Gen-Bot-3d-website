import { Elysia, t } from "elysia";
import { FutureTechModel } from "../models/Future-tech";

export const FutureTechController = new Elysia({
  prefix: "/futuretech",
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

        const result = await FutureTechModel.findOneAndUpdate(
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
        tags: ["FutureTech"],
        description: "Create or update FutureTech page content",
        summary: "Create/Update Content",
      },
    }
  )
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
