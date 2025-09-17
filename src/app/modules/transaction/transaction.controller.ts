import { NextFunction, Request, Response } from "express";
import { Transaction } from "./transaction.model";
import { UserWallet } from "../user/registration/user.model";
import { Role } from "../user/registration/user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { SortOrder } from "mongoose";

const allTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = req.query.sortBy as string || "createdAt";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  const skip = (page - 1) * limit;

  const sort: { [key: string]: SortOrder } = {};
  sort[sortBy] = sortOrder;

  // Fetch transactions with pagination and sorting
  const transactions = await Transaction.find()
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments();

  res.status(200).send({
    success: true,
    message: "All Transaction Retrieved",
    transactions,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const userTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const number = req.params.number;
  const token = req.headers.authorization;
  const user = await UserWallet.findOne({ phone: number });
  const verifiedToken = verifyToken(
    token as string,
    envVars.JWT_SECRET
  ) as JwtPayload;

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User doesn't exist",
    });
  }

  if (user?.role !== Role.USER) {
    return res.status(400).send({
      success: false,
      message: "You heat the wrong place",
    });
  }

  if (!verifiedToken) {
    return res.status(400).send({
      success: false,
      message: "Token does not matched",
    });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = req.query.sortBy as string || "createdAt";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const skip = (page - 1) * limit;
  const sort: { [key: string]: SortOrder } = {};
  sort[sortBy] = sortOrder;

  const transactions = await Transaction.find({ senderNumber: number })
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments({ senderNumber: number });

  res.status(200).send({
    success: true,
    message: "Transaction got",
    transactions,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};
const agentTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const number = req.params.number;
  const token = req.headers.authorization;
  const agent = await UserWallet.findOne({ phone: number });
  const verifiedToken = verifyToken(
    token as string,
    envVars.JWT_SECRET
  ) as JwtPayload;

  if (!agent) {
    return res.status(400).send({
      success: false,
      message: "Agent doesn't exist",
    });
  }

  if (agent?.role !== Role.AGENT) {
    return res.status(400).send({
      success: false,
      message: "You heat the wrong place",
    });
  }

  if (!verifiedToken) {
    return res.status(400).send({
      success: false,
      message: "Token does not matched",
    });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = req.query.sortBy as string || "createdAt";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const skip = (page - 1) * limit;
  const sort: { [key: string]: SortOrder } = {};
  sort[sortBy] = sortOrder;

  const transactions = await Transaction.find({ senderNumber: number })
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments({ senderNumber: number });

  res.status(200).send({
    success: true,
    message: "Transaction got",
    transactions,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const transactionController = {
  allTransaction,
  userTransaction,
  agentTransaction,
};
