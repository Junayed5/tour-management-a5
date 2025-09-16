import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../../middlewares/validateRequest";
import createUserWalletZodSchema from "./user.validation";
import { checkAuth } from "../../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserWalletZodSchema),
  UserController.createUserWallet
);
router.get(
  "/all-wallets",
  checkAuth(Role.ADMIN),
  UserController.getAllWallets
);

router.patch("/block/:number", checkAuth(Role.ADMIN), UserController.blockUserWallet);
router.patch("/active/:number", checkAuth(Role.ADMIN), UserController.activeUserWallet);

export const userRouter = router;
