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
    [bankAccountActionTypes.WITHDRAW]: (state: IAppState, payload?: IResDataTransaction, impactAccount?: string) => {




        return {
            ...state
        }
    },
    [bankAccountActionTypes.TRANSFER]: (state: IAppState) => {
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