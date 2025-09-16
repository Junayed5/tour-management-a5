import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/registration/user.interface";
import { transactionController } from "./transaction.controller";

const routes = Router();

routes.get("/all", checkAuth(Role.ADMIN), transactionController.allTransaction);
routes.get("/user/:number", transactionController.userTransaction)
routes.get("/agent/:number", transactionController.agentTransaction)

export const transactionRouter = routes;