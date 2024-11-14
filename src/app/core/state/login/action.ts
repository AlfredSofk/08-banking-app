import { IAuthState } from "../../interfaces/auth";
import { ILoginToken } from "../../interfaces/requestApiTo";


export const loginActionTypes = {

    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOADING: 'LOADING',
    ERROR: 'ERROR'
}


export const login = (payload: ILoginToken) => ({
    type: loginActionTypes.LOGIN,
    payload
});

export const logout = () => ({
    type: loginActionTypes.LOGOUT,
});

export const loading = (payload: IAuthState) => ({
    type: loginActionTypes.LOADING,
    payload
});

export const errorLogin = (error: string) => ({
    type: loginActionTypes.ERROR,
    payload: error
});
