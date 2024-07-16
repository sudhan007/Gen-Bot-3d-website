import { Elysia, t } from "elysia";
import { RobotFeaturesModel } from "../models/Robot-features";

export const RobotFeaturesController = new Elysia({
  prefix: "/robotfeatures",
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

        await RobotFeaturesModel.deleteMany({});

        const result = await RobotFeaturesModel.insertMany(records);
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
        tags: ["Robot features"],
        summary: "Create Robotic features",
        description: "Create Robotic features",
      },
    }
  )
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
