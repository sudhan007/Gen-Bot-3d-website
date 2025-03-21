import Elysia from "elysia";
import { HomeController } from "./Home-controller";
import { AboutController } from "./About-controller";
import { RoboticIntelligenceController } from "./RoboticIntelligence-controller";
import { HumanRobotController } from "./Human-Robot-controller";
import { RobotFeaturesController } from "./Robot-features-controller";
import { FutureTechController } from "./Future-tech-controller";
import { ClientController } from "./client/root";
export const RootRouter = new Elysia({
  prefix: "/api",
})
.use(ClientController)
  .use(HomeController)
  .use(AboutController)
  .use(RoboticIntelligenceController)
  .use(HumanRobotController)
  .use(RobotFeaturesController)
  .use(FutureTechController);
