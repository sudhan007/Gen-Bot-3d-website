import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { RootRouter } from "./controller/root";

export const app = new Elysia();

app.use(cors());

try {
  await mongoose.connect(process.env.MONGO_URI as string, {
    dbName: "Gen-Bot",
  });
  console.log("MongoDB connected");
} catch (error: any) {
  console.log(error.message);
}

app.use(RootRouter);

//Swagger
app.use(
  swagger({
    path: "/docs",
    autoDarkMode: true,
    theme: "auto",
    exclude: ["/docs", "/docs/json", "/"],
    documentation: {
      info: {
        title: "Gen-Bot API",
        version: "1.0.0",
        description: "Gen-Bot API Documentation",
      },
    },
  })
);

app.get("/", () => {
  return "Hello World";
});

app.onError(({ code, error }) => {
  if (code === "VALIDATION") {
    return {
      status: 400,
      body: error.all,
    };
  }
});
