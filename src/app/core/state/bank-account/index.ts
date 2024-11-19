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

    [bankAccountActionTypes.DEPOSIT]: (state: IAppState) => {

        return {
            ...state
        }

    },

    [bankAccountActionTypes.DEPOSITACCOUNT]: (state: IAppState, payload: IResDataTransaction) => {

        const { dinBody, impactAccount } = payload

        const findedIndexAccount = state.userAccounts.findIndex(element => element.number === impactAccount)

        const { amount } = state.userAccounts[findedIndexAccount]

        state.userAccounts[findedIndexAccount].amount = amount + dinBody.amountTransaction

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

        state.saldoGlobal = state.userAccounts.reduce((acum, transaccion) => {
            return acum + transaccion.amount
        }, 0)

        return {
            ...stateCopy,

        }
    },

    [bankAccountActionTypes.TRANSFER]: (state: IAppState, payload: IResDataTransaction) => {

        const stateCopy = { ...state }
        const { dinBody, impactAccount } = payload
        const findedIndexAccount = stateCopy.userAccounts.findIndex(element => element.number === impactAccount)
        const amountAux = stateCopy.userAccounts[findedIndexAccount].amount
        const transactionFee = (dinBody.amountTransaction + dinBody.transactionCost)
        stateCopy.userAccounts[findedIndexAccount].amount = amountAux - transactionFee

        return {
            ...state

        }
    },
    [bankAccountActionTypes.PURCHASE]: (state: IAppState) => {
        return {
            ...state,
            saldoGlobal: state.saldoGlobal + state.transacciones[state.transacciones.length - 1].amount
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