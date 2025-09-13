import { model, Schema } from "mongoose";
import { IAddMoneyWalletControl, IUserWalletControl } from "./userContro.interface";

const userWalletControlSchema = new Schema<IUserWalletControl>({
    phone: {type: String, required: true},
    password: {type: String, required: true},
    amount: {type: String, required: true},
    userNumber: {type: String, required: true},
});

export const UserWalletManage = model("UserWalletManage", userWalletControlSchema);


const addMoneyWalletControlSchema = new Schema<IAddMoneyWalletControl>({
    phone: {type: String, required: true},
    password: {type: String, required: true},
    amount: {type: String, required: true},
    agentNumber: {type: String, required: true},
    agentPassword: {type: String, required: true},
});

export const AddMoney = model("AddMoney", addMoneyWalletControlSchema)

