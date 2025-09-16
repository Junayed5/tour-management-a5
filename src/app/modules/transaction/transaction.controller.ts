import { NextFunction, Request, Response } from "express";
import { Transaction } from "./transaction.model";
import { UserWallet } from "../user/registration/user.model";
import { Role } from "../user/registration/user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const allTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transactions = await Transaction.find();

  if (!transactions) {
    return res.status(400).send({
      success: false,
      message: "Transaction load failed",
      transactions,
    });
  }

  res.status(200).send({
    success: true,
    message: "All Transaction Retrieved",
    transactions,
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

  const transaction = await Transaction.find({senderNumber: number});

   res.status(200).send({
    success: true,
    message: "Transaction got",
    transaction
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

  const transaction = await Transaction.find({senderNumber: number});

   res.status(200).send({
    success: true,
    message: "Transaction got",
    transaction
  });
};

export const transactionController = {
  allTransaction,
  userTransaction,
  agentTransaction,
};
