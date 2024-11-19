import { IResDataTransaction, IResGetDataClient } from "../../interfaces/requestApiTo";



export const bankAccountActionTypes = {

    DEPOSIT: 'DEPOSIT',
    DEPOSITACCOUNT: 'DEPOSITACCOUNT',
    WITHDRAW: 'WITHDRAW',
    TRANSFER: 'TRANSFER',
    PURCHASE: 'PURCHASE',
    GET_DATA_USER: 'GET_DATA_USER',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
}


export const deposit = (payload: IResDataTransaction, impactAccount: string) => ({
    type: bankAccountActionTypes.DEPOSIT,
    payload: {
        ...payload,
        impactAccount
    }
});

export const depositAccount = (payload : IResDataTransaction, impactAccount : string) => ({
    type: bankAccountActionTypes.DEPOSITACCOUNT,
    payload: {
        ...payload,
        impactAccount
    }
})

export const withdraw = (payload: IResDataTransaction, impactAccount: string) => ({
    type: bankAccountActionTypes.WITHDRAW,
    payload: {
        ...payload,
        impactAccount
    }
});

export const transfer = (payload: IResDataTransaction, impactAccount: string, destinyAccount: string) => ({
    type: bankAccountActionTypes.TRANSFER,
    payload: {
        ...payload,
        impactAccount,
        destinyAccount
    }
});


export const purchase = () => ({
    type: bankAccountActionTypes.PURCHASE,
});

export const loadingBankAccount = (payload: boolean) => ({
    type: bankAccountActionTypes.LOADING,
    payload
});

export const getDataUser = (payload: IResGetDataClient) => ({
    type: bankAccountActionTypes.GET_DATA_USER,
    payload
})


export const errorGetDataAccount = (error: string) => ({
    type: bankAccountActionTypes.ERROR,
    payload: error
});

export const errorTransaction = (error: string) => ({
    type: bankAccountActionTypes.ERROR,
    payload: error
});

