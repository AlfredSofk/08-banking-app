
interface ITransaction {
    id: string;
    amount: number;
    type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER' | 'PURCHASE';
    description: string;
    createdAt: Date;
}

interface IUserAccounts {
    number: string;
    amount: number;
}

export interface IAppState {
    saldoGlobal: number;
    transacciones: ITransaction[];
    username: string;
    userAccounts: IUserAccounts[];
    loading: boolean;
    error: string | null;
}