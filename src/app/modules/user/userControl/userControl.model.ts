import { model, Schema } from "mongoose";
import { IUserWalletControl } from "./userContro.interface";

const userWalletControlSchema = new Schema<IUserWalletControl>({
    phone: {type: String, required: true},
    password: {type: String, required: true},
    amount: {type: String, required: true},
    userNumber: {type: Schema.Types.ObjectId, required: true},
});

export const UserWalletManage = model("UserWalletManage", userWalletControlSchema)

