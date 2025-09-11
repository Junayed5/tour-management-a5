import { envVars } from "../../../config/env"
import { IUserWallet } from "./user.interface"
import { UserWallet } from "./user.model"
import bcryptjs from 'bcryptjs'

const createUserWallet = async(payload: Partial<IUserWallet>) => {


    const {phone, password , ...rest} = payload;
    
    const hashPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUNDS))

    const newUserWallet = await UserWallet.create({
        phone,
        password : hashPassword,
        ...rest 
    });

    return newUserWallet
}

export const userWalletService = {
    createUserWallet
}