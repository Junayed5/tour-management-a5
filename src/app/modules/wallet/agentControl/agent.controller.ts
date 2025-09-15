import { NextFunction, Request, Response } from "express";
import { UserWallet } from "../../user/registration/user.model";
import { IUserWallet, Role } from "../../user/registration/user.interface";
import bcryptjs from "bcryptjs";
import { verifyToken } from "../../../utils/jwt";
import { envVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { transaction } from "../../transaction/transaction";
import { TransactionType } from "../../transaction/transaction.interface";

const cashIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = req.body;
    const token = req.headers.authorization;
    const agentFind: any = await UserWallet.findOne({
      phone: agent.agentNumber,
    });
    const user = await UserWallet.findOne({ phone: agent.userNumber });
    const amount = Number(req.body.amount);
    const verifyPassword = await bcryptjs.compare(
      agent.agentPassword,
      agentFind.password
    );

    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_SECRET
    ) as JwtPayload;

    if (!verifyPassword) {
      res.status(400).send({
        success: false,
        message: "User Password doesn't matched",
      });
    }

    if (verifiedToken.role !== Role.AGENT && agentFind?.role !== Role.AGENT) {
      res.status(400).send({
        success: false,
        message: "You are not a agent",
      });
    }

    if (user?.role !== Role.USER) {
      res.status(400).send({
        success: false,
        message: "Invalid User, Provide a valid user number",
      });
    }

    if (
      verifyPassword &&
      user?.role === Role.USER &&
      agentFind &&
      agentFind.wallet
    ) {
      agentFind.wallet.balance -= amount;
    }

    if (verifyPassword && user && user.wallet) {
      user.wallet.balance = (Number(user.wallet.balance) + amount).toString();
    }

    await agentFind.save();
    await user?.save();
    if (user) {
      await transaction(
        agentFind.phone,
        user.phone,
        amount.toString(),
        TransactionType.CASH_IN
      );
    }

    res.status(200).send({
      success: true,
      message: "Cash In successfully",
      data: {
        sender: agentFind,
        receiver: user,
      },
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const cashOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;
    const agent = await UserWallet.findOne({ phone: data.agentNumber });
    const user = await UserWallet.findOne({ phone: data.userNumber });
    const amount = Number(req.body.amount);
    const verifyAgentPassword = await bcryptjs.compare(
      data.agentPassword,
      agent?.password as string
    );
    const verifyUserPassword = await bcryptjs.compare(
      data.userPassword,
      user?.password as string
    );
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_SECRET
    ) as JwtPayload;

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not found",
      });
    }
    if (!agent) {
      return res.status(400).send({
        success: false,
        message: "Agent Not found",
      });
    }
    if (!verifyAgentPassword || !verifyUserPassword) {
      return res.status(400).send({
        success: false,
        message: "Password Doesn't matched",
      });
    }

    if (verifiedToken.role !== Role.AGENT) {
      return res.status(400).send({
        success: false,
        message: "You are not a agent",
      });
    }

    if (user?.role !== Role.USER) {
      return res.status(400).send({
        success: false,
        message: "Provide a valid user",
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send({
        success: false,
        message: "Invalid amount",
      });
    }
    if (amount > Number(agent?.wallet?.balance)) {
      return res.status(400).send({
        success: false,
        message: "You have not available balance",
      });
    }

    if (verifyAgentPassword && agent && agent.wallet) {
      agent.wallet.balance = (Number(agent.wallet.balance) + amount).toString();
    }
    if (verifyUserPassword && user && user.wallet) {
      user.wallet.balance = (Number(user.wallet.balance) - amount).toString();
    }

    await user.save();
    await agent.save();

    res.status(200).send({
      success: true,
      message: "Cash out force by agent successfully",
      data: {
        sender: user,
        receiver: agent,
      },
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const agentController = {
  cashIn,
  cashOut,
};
