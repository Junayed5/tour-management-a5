import z from "zod";
import { TransactionType } from "./transaction.interface";

const createTransactionZodSchema = z.object({
     senderNumber: z.string({ error: () => ({ message: "Sender Number must be a string" }) }),
    receiverNumber: z.string({ error: () => ({ message: "Receiver Number must be a string" }) }),
    amount: z.string({ error: () => ({ message: "Amount must be a string" }) }),
    transactionType: z.nativeEnum(TransactionType, { error: () => ({ message: "Invalid transaction type" }) }),
    fees: z.string().optional(),
    commission: z.string().optional(),
})

export default createTransactionZodSchema;