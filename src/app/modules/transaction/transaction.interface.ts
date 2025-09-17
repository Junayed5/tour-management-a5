export enum TransactionType {
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
  SEND_MONEY = "SEND_MONEY",
  ADD_MONEY = "ADD_MONEY",
}

export enum TransactionStatus {
  pending = "pending",
  completed = "completed",
  reversed = "reversed",
}

export interface ITransaction {
  senderNumber: string;
  receiverNumber: string;
  amount: string;
  transactionType: TransactionType;
  status: TransactionStatus,
  fees?: string;
  commission?: string;
}
