import { Elysia, t } from "elysia";
import { RoboticIntelligenceModel } from "../models/Robotic-Intelligence";

export const RoboticIntelligenceController = new Elysia({
  prefix: "/roboticintelligence",
})

  .post(
    "/create",
    async ({ body, set }) => {
      try {
        const { records } = body;
        if (!records) {
          set.status = 400;
          return { error: "All fields are required" };
        }
        console.log(records);

        if (!Array.isArray(records) || records.length !== 5) {
          set.status = 400;
          return { error: "You must send exactly 5 records" };
        }

        for (const record of records) {
          const { title, content } = record;
          if (!title || !content) {
            set.status = 400;
            return { error: "All fields are required" };
          }
        }

        await RoboticIntelligenceModel.deleteMany({});

        const result = await RoboticIntelligenceModel.insertMany(records);
        set.status = 200;
        return {
          data: result,
          message: "Contents created successfully",
        };
      } catch (error: any) {
        set.status = 500;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        records: t.Array(
          t.Object({
            title: t.String(),
            content: t.String(),
          })
        ),
      }),
      detail: {
        tags: ["RoboticIntelligence"],
        summary: "Create Robotic Intelligence",
        description: "Create Robotic Intelligence",
      },
    }
  )
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
