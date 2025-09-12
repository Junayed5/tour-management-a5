import { Router } from "express";
import { userRouter } from "../modules/user/registration/user.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { userWalletControlRoute } from "../modules/user/userControl/userControl.routes";

export const routers = Router();

const walletRouter = [
    {
        path: "/wallet",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/user",
        route: userWalletControlRoute,
    }
];

walletRouter.forEach(route => {
    routers.use(route.path, route.route)
})