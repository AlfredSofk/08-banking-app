import { createContext, useReducer } from "react";
import { IContextAuth, IStateAuthContext } from "../../interfaces/state";
import { initialState, reducer } from "./reducer";



export const AuthContext = createContext<IContextAuth>({state : {} as IStateAuthContext, dispatch : () => {} })


export const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{state , dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}