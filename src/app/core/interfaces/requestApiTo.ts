import { IDinError, IDinHeader } from "./requestToApi";

interface dinBodyLoginToken {
    token: string
}

interface BankTransactionDepositSucursal {
    accountNumberClient: string;
    amount: number;
}

export interface ILoginToken {
    dinHeader: IDinHeader;
    dinBody: dinBodyLoginToken
    dinError: IDinError;
}

export interface ITransactionDeposit {
    dinHeader: IDinHeader;
    dinBody: BankTransactionDepositSucursal;
}

export interface IResBankTransactionWithDrawFromATM {
    dinHeader: IDinHeader;
    dinError: IDinError
}