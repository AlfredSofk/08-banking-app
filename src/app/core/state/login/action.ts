
export const loginActionTypes = {

    LOGIN : 'LOGIN',
    LOGOUT : 'LOGOUT',
    LOADING : 'LOADING',
}


export const login = () => ({
    type: loginActionTypes.LOGIN,
});

export const logout = () => ({
    type: loginActionTypes.LOGOUT,
});     

export const loading = () => ({
    type: loginActionTypes.LOADING,
});     
