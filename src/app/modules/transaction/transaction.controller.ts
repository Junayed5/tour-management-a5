import { NextFunction, Request, Response } from "express"
import { Transaction } from "./transaction.model"

const allTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const transactions = await Transaction.find();

    if (!transactions) {
        return  res.status(400).send({
        success: false,
        message: "Transaction load failed",
        transactions
    })
    }

    res.status(200).send({
        success: true,
        message: "All Transaction Retrieved",
        transactions
    })
}

export const transactionController = {
    allTransaction
}