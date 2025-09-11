import { NextFunction, Request, Response } from "express";
import { userWalletService } from "./user.service";

const createUserWallet = async(req:Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const user = await userWalletService.createUserWallet(req.body);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "User Wallet created successfully",
        user
    })

}


export const userController = {
    createUserWallet
}