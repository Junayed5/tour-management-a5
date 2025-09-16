export enum TransactionType{
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT",
    SEND_MONEY = "SEND_MONEY",
    ADD_MONEY = "ADD_MONEY"
}


export interface ITransaction{
    senderNumber : string,
    receiverNumber : string,
    amount : string,
    transactionType : TransactionType,
    fees?: string,
    commission?: string
}