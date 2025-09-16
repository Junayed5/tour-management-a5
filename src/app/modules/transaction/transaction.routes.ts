import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/registration/user.interface";
import { transactionController } from "./transaction.controller";

const routes = Router();

routes.get("/all", checkAuth(Role.ADMIN), transactionController.allTransaction)

export const transactionRouter = routes;