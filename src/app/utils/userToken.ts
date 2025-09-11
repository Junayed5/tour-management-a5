import { envVars } from "../config/env";
import { IUserWallet } from "../modules/user/registration/user.interface";
import { generateToken } from "./jwt";

export const createToken = (user: Partial<IUserWallet>) => {
    const jwtPayload = {
        userId : user._id,
        phone: user.phone,
        role: user.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_SECRET, envVars.JWT_EXPIRES_IN);

    return {
        accessToken
    }
}
