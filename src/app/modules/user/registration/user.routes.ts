import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../../middlewares/validateRequest";
import createUserWalletZodSchema from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserWalletZodSchema),
  UserController.createUserWallet
);

export const userRouter = router;
