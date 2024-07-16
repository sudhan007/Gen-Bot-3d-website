import { app } from "./index";

const PORT = 4000;

app.listen(
  {
    port: PORT,
    hostname: "0.0.0.0",
  },
  () => console.log(`🦊 Elysia is running at ${app.server?.port}`)
);
