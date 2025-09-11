import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../../middlewares/validateRequest";
import createUserWalletZodSchema from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserWalletZodSchema),
  userController.createUserWallet
);

export const userRouter = router;
