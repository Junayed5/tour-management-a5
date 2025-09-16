import { Response } from "express";
import { setCookies } from "../../utils/setCookies";
import { createToken } from "../../utils/userToken";
import { IUserWallet } from "../user/registration/user.interface";
import { UserWallet } from "../user/registration/user.model";
import bcryptjs from "bcryptjs";

const loginUserWallet = async (res: Response,payload: Partial<IUserWallet>) => {
  const { phone, password } = payload;

  const user = await UserWallet.findOne({ phone });
  if (!user) {
    throw new Error("User Not found");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).send({
      success: false,
      message: "Password is not matched, please try a valid password..",
    });
  }

  // // token will be genareted

  const userToken = createToken(user);

  setCookies(res, userToken);

  const { password: pass, ...rest } = user.toObject();

  return {
    accessToken: userToken.accessToken,
    user: rest,
  };
};

export const authService = {
  loginUserWallet,
};
