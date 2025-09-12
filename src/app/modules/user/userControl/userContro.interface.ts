import { Types } from "mongoose";

export interface IUserWalletControl {
    phone: string,
    password: string,
    amount: string,
    userNumber : Types.ObjectId
}