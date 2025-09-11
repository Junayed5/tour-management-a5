import { model, Schema } from "mongoose";
import { IsActive, IUserWallet, Role } from "./user.interface";

const registrationWalletSchema = new Schema<IUserWallet>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    isActive: {
      type: String,
      default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: true },
    wallet: {
      balance: { type: String, default: 50 },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserWallet = model("UserWallet", registrationWalletSchema);
