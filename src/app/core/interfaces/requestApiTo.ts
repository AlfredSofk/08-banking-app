import { IDinError, IDinHeader } from "./requestToApi";

interface dinBodyLoginToken {
    token: string
}

interface BankTransactionDepositSucursal {
    accountNumberClient: string;
    amount: number;
}

interface IAccounts {
    number: string;
    amount: number;
}

interface IResDinBodyGetDataClient {
    username: string;
    rol : string | null;
    accounts : IAccounts[];
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

export interface IResGetDataClient{
    dinHeader: IDinHeader;
    dinBody: IResDinBodyGetDataClient;
    dinError: IDinError;
}