import { model, Schema } from "mongoose";
import { ITransaction, TransactionType } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    senderNumber: { type: String, required: true },
    receiverNumber: { type: String, required: true },
    amount: { type: String, required: true },
    fees: { type: String },
    commission: { type: String },
    transactionType: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Transaction = model("Transaction", transactionSchema);
