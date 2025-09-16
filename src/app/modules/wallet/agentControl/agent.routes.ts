import { Router } from "express";
import { agentController } from "./agent.controller";
import { checkAuth } from "../../../middlewares/checkAuth";
import { Role } from "../../user/registration/user.interface";

const routes = Router();

routes.post("/cash-in", agentController.cashIn)
routes.post("/cash-out", agentController.cashOut);

routes.patch("/block/:number", checkAuth(Role.ADMIN), agentController.blockAgentWallet);
routes.patch("/active/:number", checkAuth(Role.ADMIN), agentController.activeAgentWallet);

export const agentRouters = routes;