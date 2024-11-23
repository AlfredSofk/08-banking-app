import { IAppState } from "../../interfaces/bankAccount";
import { IResDataTransaction, IResGetDataClient } from "../../interfaces/requestApiTo";
import { bankAccountActionTypes } from "./action";

// appReducer.js
export const initialAppState: IAppState = {
    transacciones: [],
    userAccounts: [],
    username: '',
    saldoGlobal: 0,
    loading: false,
    error: null,
};


export const bankAccountCases = {

    [bankAccountActionTypes.DEPOSIT]: (state: IAppState, payload: IResDataTransaction) => {

        const {dinBody, impactAccount} = payload
        const findedIndexAccount = state.userAccounts.findIndex(element => element.number === impactAccount)

        const { amount } = state.userAccounts[findedIndexAccount]

        state.userAccounts[findedIndexAccount].amount = amount + dinBody.amountTransaction

        state.saldoGlobal = state.userAccounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)

        return {
            ...state
        }

    },

    [bankAccountActionTypes.DEPOSITACCOUNT]: (state: IAppState, payload: IResDataTransaction) => {

        const { dinBody, impactAccount } = payload

        const findedIndexAccount = state.userAccounts.findIndex(element => element.number === impactAccount)

        const { amount } = state.userAccounts[findedIndexAccount]

        state.userAccounts[findedIndexAccount].amount = amount + dinBody.amountTransaction

        state.saldoGlobal = state.userAccounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)

        return {
            ...state
        }
    },

    [bankAccountActionTypes.WITHDRAW]: (state: IAppState, payload: IResDataTransaction) => {

        const stateCopy = { ...state }

        const { dinBody, impactAccount } = payload

        const findedIndexAccount = stateCopy.userAccounts.findIndex(element => element.number === impactAccount)
        const amountAux = stateCopy.userAccounts[findedIndexAccount].amount
        const transactionFee = (dinBody.amountTransaction + dinBody.transactionCost)

        stateCopy.userAccounts[findedIndexAccount].amount = amountAux - transactionFee
        
        stateCopy.saldoGlobal = state.userAccounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)

        return {
            ...stateCopy,
        }
    },

    [bankAccountActionTypes.TRANSFER]: (state: IAppState, payload: IResDataTransaction) => {

        const stateCopy = { ...state }
        const { dinBody, impactAccount,destinyAccount } = payload

        const findedIndexAccount = stateCopy.userAccounts.findIndex(element => element.number === impactAccount)
        const findedIndexDestinyAccount = stateCopy.userAccounts.findIndex(element => element.number === destinyAccount)

        const amountAux = stateCopy.userAccounts[findedIndexAccount].amount
        const amountDestinyAux = stateCopy.userAccounts[findedIndexDestinyAccount].amount


        const transactionFee = (dinBody.amountTransaction + dinBody.transactionCost)

        stateCopy.userAccounts[findedIndexAccount].amount = amountAux - transactionFee
        stateCopy.userAccounts[findedIndexDestinyAccount].amount = amountDestinyAux + dinBody.amountTransaction


        stateCopy.saldoGlobal = state.userAccounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)

        return {
            ...stateCopy

        }
    },

    [bankAccountActionTypes.PURCHASE]: (state: IAppState, payload : IResDataTransaction) => {

        const stateCopy = {...state}

        const { dinBody, impactAccount}= payload
        const findedIndexAccount = stateCopy.userAccounts.findIndex(element => element.number === impactAccount)
        

        const amountAux = stateCopy.userAccounts[findedIndexAccount].amount
        const transactionFee = (dinBody.amountTransaction + dinBody.transactionCost)

        stateCopy.userAccounts[findedIndexAccount].amount = amountAux - transactionFee
        
        stateCopy.saldoGlobal = state.userAccounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)


        return {
            ...stateCopy
        }
    },

    [bankAccountActionTypes.PURCHASE_LOCAL] : (state : IAppState, payload : IResDataTransaction) => {
        const stateCopy = {...state}

        const { dinBody, impactAccount}= payload
        const findedIndexAccount = stateCopy.userAccounts.findIndex(element => element.number === impactAccount)
        

        const amountAux = stateCopy.userAccounts[findedIndexAccount].amount
        const transactionFee = (dinBody.amountTransaction + dinBody.transactionCost)

        stateCopy.userAccounts[findedIndexAccount].amount = amountAux - transactionFee
        
        stateCopy.saldoGlobal = state.userAccounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)


        return {
            ...stateCopy
        }
    },

    [bankAccountActionTypes.LOADING]: (state: IAppState, payload: boolean) => {
        return {
            ...state,
            loading: payload
        }
    },

    [bankAccountActionTypes.GET_DATA_USER]: (state: IAppState, payload?: IResGetDataClient) => {

        const saldoGlobal = payload?.dinBody.accounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)


        return {
            ...state,
            username: payload?.dinBody.username,
            userAccounts: payload?.dinBody.accounts,
            loading: false,
            saldoGlobal
        }
    },
    
    [bankAccountActionTypes.ERROR]: (state: IAppState, payload: string) => {
        return { ...state, error: payload }


    }
}