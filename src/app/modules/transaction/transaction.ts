import { TransactionType } from "./transaction.interface";
import { Transaction } from "./transaction.model";


export const transaction = async(senderNumber: string, receiverNumber: string, amount: string, transactionType: TransactionType) => {
    const payload = {
        senderNumber,
        receiverNumber,
        amount,
        transactionType
    }

    await Transaction.create(payload);
    console.log("Transaction data send")
}