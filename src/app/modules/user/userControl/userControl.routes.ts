import { Router } from "express";
import { userWalletManageController } from "./userControl.controller";

const routes = Router();

// routes.post('/add-money')
routes.post("/cash-out", userWalletManageController.withDrawMoney);
routes.post("/send-money", userWalletManageController.sendMoney);
// routes.post('/add-money')

export const userWalletControlRoute = routes;
