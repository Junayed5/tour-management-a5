import { Router } from "express";
import { AuthUserWalletController } from "./auth.controller";

const router = Router();

router.post('/login', AuthUserWalletController.walletLogin);
router.post('/logout', AuthUserWalletController.logout);

export const authRouter = router