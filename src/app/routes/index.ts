import { Router } from "express";
import { userRouter } from "../modules/user/registration/user.routes";
import { authRouter } from "../modules/auth/auth.routes";

export const routers = Router();

const walletRouter = [
    {
        path: "/wallet",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRouter
    }
];

walletRouter.forEach(route => {
    routers.use(route.path, route.route)
})