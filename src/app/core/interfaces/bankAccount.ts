
interface ITransaction{
    id: string;
    amount: number;
    type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER' | 'PURCHASE';
    description: string ;   
    createdAt: Date;
}


export interface IAppState{
    saldoGlobal: number;
    transacciones: ITransaction[];
    loading: boolean;
    error: string | null;
}
