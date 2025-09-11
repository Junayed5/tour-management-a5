import { Router } from "express";
import { AuthUserWalletController } from "./auth.controller";

const router = Router();

router.post('/login', AuthUserWalletController.walletLogin);

export const authRouter = router