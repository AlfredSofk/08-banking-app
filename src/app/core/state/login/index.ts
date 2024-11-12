import { IAuthState } from "../../interfaces/auth"
import { loginActionTypes } from "./action";


export const initialAuthState : IAuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  export const loginCases = {

    [loginActionTypes.LOGIN] : (state : IAuthState, payload? : any) => {
        return{
            ...state
        }
    },
    [loginActionTypes.LOGOUT] : (state : IAuthState) => {
        return{
            ...state
        }
    },
    [loginActionTypes.LOADING] : (state : IAuthState) => {
        return{
            ...state
            
          } 
      },
    }