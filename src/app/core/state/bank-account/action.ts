import { IResDataTransaction, IResGetDataClient } from "../../interfaces/requestApiTo";



export const bankAccountActionTypes = {

    DEPOSIT: 'DEPOSIT',
    WITHDRAW: 'WITHDRAW',
    TRANSFER: 'TRANSFER',
    PURCHASE: 'PURCHASE',
    GET_DATA_USER: 'GET_DATA_USER',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
}


export const deposit = () => ({
    type: bankAccountActionTypes.DEPOSIT,
});

export const withdraw = (payload: IResDataTransaction, impactAccount: string) => ({
    type: bankAccountActionTypes.WITHDRAW,
    payload: {
        ...payload,
        impactAccount
    }
});

export const transfer = () => ({
    type: bankAccountActionTypes.TRANSFER,
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

