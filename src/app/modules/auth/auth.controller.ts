import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";

const walletLogin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const loginUser = await authService.loginUserWallet(res, user);

  if (!loginUser) {
    return res.status(404).json({
      success: false,
      message: "Login failed",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Login Successfully",
    user: loginUser,
  });
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("accessToken", {
    httpOnly:true,
    secure:false,
    sameSite: false
  })

  return res.status(200).json({
    success: true,
    message: "Logout Successfully",
    user: null,
  });
}

export const AuthUserWalletController = {
  walletLogin,
  logout,
};
