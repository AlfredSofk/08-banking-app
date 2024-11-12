import { IAppState } from "../../interfaces/bankAccount";
import { bankAccountActionTypes } from "./action";

// appReducer.js
export const initialAppState : IAppState = {
    transacciones: [],
    saldoGlobal: 0,   
    loading: false,   
    error: null,      
  };
  

  export const bankAccountCases = {

    [bankAccountActionTypes.DEPOSIT] : (state : IAppState) => {

        return{
            ...state
        }

    },
    [bankAccountActionTypes.WITHDRAW] : (state : IAppState, payload? : any) => {
        return{
            ...state
        }
    },
    [bankAccountActionTypes.TRANSFER] : (state : IAppState) => {
        return{
            ...state
            
          } 
      },
     [bankAccountActionTypes.PURCHASE] : (state : IAppState) => {
         return{
             ...state,
             saldoGlobal: state.saldoGlobal + state.transacciones[state.transacciones.length - 1].amount
         }
     },             
  }