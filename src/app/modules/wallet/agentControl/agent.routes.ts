import { Router } from "express";
import { agentController } from "./agent.controller";

const routes = Router();

routes.post("/cash-in", agentController.cashIn)
routes.post("/cash-out", agentController.cashOut)

export const agentRouters = routes;