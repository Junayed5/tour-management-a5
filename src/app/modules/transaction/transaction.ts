import { Role } from "../user/registration/user.interface";
import { TransactionType } from "./transaction.interface";
import { Transaction } from "./transaction.model";


export const transaction = async(senderNumber: string, receiverNumber: string, amount: string, transactionType: TransactionType, role: Role) => {

    const feesAmount = Number(amount) * 0.02;
    const commissionAmount = Number(amount) * 0.005;
    const commission =  commissionAmount;
    const fees = Number(amount) - feesAmount;

    const payload = {
        senderNumber,
        receiverNumber,
        amount,
        transactionType,
        ...(role === Role.AGENT
            ? { commission }
            : { fees })
    }

    await Transaction.create(payload);
    console.log("Transaction data send")
}