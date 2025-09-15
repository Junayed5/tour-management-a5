import { Router } from "express";
import { userRouter } from "../modules/user/registration/user.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { userWalletControlRoute } from "../modules/wallet/userControl/userControl.routes";
import { agentRouters } from "../modules/wallet/agentControl/agent.routes";

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
    },
    {
        path: "/agent",
        route: agentRouters,
    },
];

walletRouter.forEach(route => {
    routers.use(route.path, route.route)
})