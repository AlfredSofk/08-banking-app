import { IAuthState } from "../../interfaces/auth"
import { ILoginToken } from "../../interfaces/requestApiTo";
import { parseJwt } from "../../utils/JWT";
import { loginActionTypes } from "./action";


export const initialAuthState: IAuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginCases = {

    [loginActionTypes.LOGIN]: (state: IAuthState, payload?: ILoginToken) => {

        const responseToken = payload?.dinBody.token
        const jwt = parseJwt(responseToken)


        return {
            ...state,
            isAuthenticated: true,
            user: jwt.sub,
            loading: false,
        }
    },
    [loginActionTypes.LOGOUT]: (state: IAuthState) => {
        return {
            ...state
        }
    },
    [loginActionTypes.LOADING]: (state: IAuthState) => {
        return {
            ...state,
            loading: true
        }
    },
    [loginActionTypes.ERROR]: (state: IAuthState, payload: string) => {
        return { ...state, error: payload }
    }
}