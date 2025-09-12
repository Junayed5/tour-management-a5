import { Router } from "express";
import { userWalletManageController } from "./userControl.controller";

const routes = Router();

// routes.post('/add-money')
// routes.post('/withdraw')
routes.post("/send-money", userWalletManageController.sendMoney);
// routes.post('/add-money')

export const userWalletControlRoute = routes;
