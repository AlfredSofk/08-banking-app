export interface ITransaction {
    id: string;
    amountTransaction: number;
    transactionCost: number;
    typeTransaction: string;
    timestamp: Date;
}

export interface IBankTransactionWithDrawFromATM {
    accountNumber :	string
    amount:	number
}


