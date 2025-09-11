import { Router } from "express";
import { userRouter } from "../modules/user/registration/user.routes";

export const routers = Router();

const walletRouter = [
    {
        path: "/user",
        route: userRouter
    }
];

walletRouter.forEach(route => {
    routers.use(route.path, route.route)
})