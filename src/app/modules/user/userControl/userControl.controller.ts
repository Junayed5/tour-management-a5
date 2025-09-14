import { NextFunction, Request, Response } from "express";
import { UserWalletManage } from "./userControl.model";
import { UserWallet } from "../registration/user.model";
import { verifyToken } from "../../../utils/jwt";
import { envVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../registration/user.interface";
import bcryptjs from "bcryptjs";

const sendMoney = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const token = req.headers.authorization;
     const amount = Number(req.body.amount);

    const userCheck: any = await UserWallet.findOne({ phone: user.phone });
    const verifyPassword = await bcryptjs.compare(
      user.password,
      userCheck.password
    );

    if (!verifyPassword) {
      res.status(400).send({
        success: false,
        message: "User Password doesn't matched",
      });
    }
    if (!userCheck) {
      res.status(400).send({
        success: false,
        message: "User Don't matched",
      });
    }

    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_SECRET
    ) as JwtPayload;

    if (verifiedToken.phone !== userCheck?.phone) {
      res.status(400).send({
        success: false,
        message: "Phone number doesn't matched",
      });
    }
    const sendUser = req.body.userNumber;
    const sendMoneyUser: any = await UserWallet.findOne({ phone: sendUser });

    if (!sendMoneyUser) {
      res.status(400).send({
        success: false,
        message: "Wallet is not found",
      });
    }

   

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send({
        success: false,
        message: "Invalid amount",
      });
    }
    if (amount > userCheck?.wallet?.balance) {
      res.status(400).send({
        success: false,
        message: `You balance is less than ${amount}`,
      });
    }

    if (verifyPassword) {
      userCheck.wallet.balance -= amount;
    }
    if (verifyPassword && sendMoneyUser && sendMoneyUser.wallet) {
      sendMoneyUser.wallet.balance =
        Number(sendMoneyUser.wallet.balance) + amount;
    }

    await userCheck.save();
    await sendMoneyUser.save();
    res.status(200).send({
      success: true,
      message: `Money Send Successfully`,
      data: {
        sender: userCheck,
        receiver: sendMoneyUser,
      },
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }

  // const moneyTransfer = await UserWalletManage.
};

const withDrawMoney = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const token = req.headers.authorization;
    const amount = Number(req.body.amount);

    const userCheck: any = await UserWallet.findOne({ phone: user.phone });
    const verifyPassword = await bcryptjs.compare(user.password, userCheck.password);

     if (!verifyPassword) {
      res.status(400).send({
        success: false,
        message: "User Password doesn't matched",
      });
    }

    if (!userCheck) {
      res.status(400).send({
        success: false,
        message: "User Don't matched",
      });
    }

    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_SECRET
    ) as JwtPayload;

    if (verifiedToken.phone !== userCheck?.phone) {
      res.status(400).send({
        success: false,
        message: "Phone number doesn't matched",
      });
    }

    const sendUser = req.body.userNumber;
    const withDrawAgent: any = await UserWallet.findOne({ phone: sendUser });

    if (!withDrawAgent) {
      res.status(400).send({
        success: false,
        message: "Agent is not found",
      });
    }
    if (withDrawAgent.role !== Role.AGENT) {
      res.status(400).send({
        success: false,
        message: "This is not a Agent number, Please Provide an agent number",
      });
    }
    

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send({
        success: false,
        message: "Invalid amount",
      });
    }
    if (amount > userCheck?.wallet?.balance) {
      res.status(400).send({
        success: false,
        message: `You balance is less than ${amount}`,
      });
    }

    if (verifyPassword && withDrawAgent.role === Role.AGENT) {
      userCheck.wallet.balance -= amount;
    }
    if (verifyPassword && withDrawAgent && withDrawAgent.wallet) {
      withDrawAgent.wallet.balance =
        Number(withDrawAgent.wallet.balance) + amount;
    }

    await userCheck.save();
    await withDrawAgent.save();
    res.status(200).send({
      success: true,
      message: `Money Send Successfully`,
      data: {
        sender: userCheck,
        receiver: withDrawAgent,
      },
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addMoney = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const token = req.headers.authorization;

    const userFind: any = await UserWallet.findOne({ phone: user.phone });

    const verifyPassword = await bcryptjs.compare(
      user.password,
      userFind.password
    );

    if (!verifyPassword) {
      res.status(400).send({
        success: false,
        message: "User Password doesn't matched",
      });
    }

    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_SECRET
    ) as JwtPayload;

    if (verifiedToken.phone !== userFind?.phone) {
      res.status(400).send({
        success: false,
        message: "Phone number doesn't matched",
      });
    }

    const agent = req.body;
    const addMoneyAgent: any = await UserWallet.findOne({
      phone: agent.agentNumber,
    });

    const verifyAgentPassword = await bcryptjs.compare(
      agent.agentPassword,
      addMoneyAgent.password
    );

    if (!verifyAgentPassword) {
      res.status(400).send({
        success: false,
        message: "Agent Password doesn't matched",
      });
    }

    if (!addMoneyAgent) {
      res.status(400).send({
        success: false,
        message: "Agent is not found",
      });
    }
    if (addMoneyAgent.role !== Role.AGENT) {
      res.status(400).send({
        success: false,
        message: "This is not a Agent number, Please Provide an agent number",
      });
    }
    const amount = Number(req.body.amount);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send({
        success: false,
        message: "Invalid amount",
      });
    }
    if (amount > addMoneyAgent?.wallet?.balance) {
      res.status(400).send({
        success: false,
        message: `You balance is less than ${amount}`,
      });
    }

    if (verifyPassword && verifyAgentPassword) {
      addMoneyAgent.wallet.balance -= amount;
    }
    if (verifyPassword && verifyAgentPassword && userFind && userFind.wallet) {
      userFind.wallet.balance = Number(userFind.wallet.balance) + amount;
    }

    await userFind.save();
    await addMoneyAgent.save();
    res.status(200).send({
      success: true,
      message: `Money Send Successfully`,
      data: {
        sender: addMoneyAgent,
        receiver: userFind,
      },
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const userWalletManageController = {
  addMoney,
  sendMoney,
  withDrawMoney,
};
