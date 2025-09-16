import { Router } from "express";
import { userWalletManageController } from "./userControl.controller";

const routes = Router();

routes.post("/add-money", userWalletManageController.addMoney);
routes.post("/cash-out", userWalletManageController.withDrawMoney);
routes.post("/send-money", userWalletManageController.sendMoney);

export const userWalletControlRoute = routes;
