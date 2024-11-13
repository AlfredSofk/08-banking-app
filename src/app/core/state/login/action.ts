import { IBodyLoginToken } from "../../interfaces/requestToApi";

export const loginActionTypes = {

    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOADING: 'LOADING',
}


export const login = (payload: IBodyLoginToken) => ({
    type: loginActionTypes.LOGIN,
    payload
});

export const logout = () => ({
    type: loginActionTypes.LOGOUT,
});

export const loading = () => ({
    type: loginActionTypes.LOADING,
});     
