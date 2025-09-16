import { NextFunction, Request, Response } from "express";
import { IsActive, Role } from "../modules/user/registration/user.interface";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { UserWallet } from "../modules/user/registration/user.model";

export const checkAuth =
  (...authRole: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      const verifiedToken = verifyToken(
        accessToken as string,
        envVars.JWT_SECRET
      ) as JwtPayload;

      const isUserExist = await UserWallet.findOne({
        phone: verifiedToken.phone,
      });

      if (!isUserExist) {
        return res.status(400).send({
          success: false,
          message: "User doesn't exist",
        });
      }

      if (isUserExist.isActive === IsActive.BLOCKED) {
        throw new Error(`User ${isUserExist.isActive}`);
      }

      if (!authRole.includes(verifiedToken.role)) {
        return res.status(400).send({
          success: false,
          message: "You are not accessible to heat this route",
        });
      }
      //   req.user = verifiedToken;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
