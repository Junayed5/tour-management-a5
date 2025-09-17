import { NextFunction, Request, Response } from "express";
import { userWalletService } from "./user.service";
import { verifyToken } from "../../../utils/jwt";
import { envVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { IsActive, Role } from "./user.interface";
import { UserWallet } from "./user.model";

const createUserWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const user = await userWalletService.createUserWallet(req.body);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User Wallet created successfully",
    user,
  });
};

const getAllWallets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = req.query.sortBy as string || "createdAt";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  const skip = (page - 1) * limit;
  const sort: { [key: string]: 1 | -1 } = {};
  sort[sortBy] = sortOrder as 1 | -1;

  const wallets = await UserWallet.find()
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await UserWallet.countDocuments();

  if (!wallets) {
    return res.status(404).json({
      success: false,
      message: "Wallet have wrong",
    });
  }

  res.status(200).json({
    success: true,
    message: "User Wallet retrieved successfully",
    wallets,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const blockUserWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const number = req.params.number;
  const blockData = {
    isActive: IsActive.BLOCKED,
  };
  const userNumber = { phone: number };

  const findNumber = await UserWallet.findOne(userNumber);

  if (findNumber?.role !== Role.USER) {
    return res.status(400).send({
      success: false,
      message: "This is not a user number",
    });
  }
  if (findNumber === null) {
    return res.status(400).send({
      success: false,
      message: "Phone number Not find",
    });
  }
  const block = await UserWallet.findOneAndUpdate(userNumber, blockData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "User blocked successfully",
    block,
  });

  next();
};
const activeUserWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const number = req.params.number;
  const blockData = {
    isActive: IsActive.ACTIVE,
  };
  const userNumber = { phone: number };

  const findNumber = await UserWallet.findOne(userNumber);

  if (findNumber?.role !== Role.USER) {
    return res.status(400).send({
      success: false,
      message: "This is not a user number",
    });
  }

  if (findNumber === null) {
    return res.status(400).send({
      success: false,
      message: "Phone number Not find",
    });
  }
  const block = await UserWallet.findOneAndUpdate(userNumber, blockData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "User Active successfully",
    block,
  });

  next();
};

export const UserController = {
  createUserWallet,
  getAllWallets,
  blockUserWallet,
  activeUserWallet
};
