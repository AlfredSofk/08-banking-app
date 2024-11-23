import { IContextApp, IStateAppContext } from "../../interfaces/state";
import { createContext, useReducer } from "react"
import { initialState, reducer } from "./reducer";


export const AppContext = createContext<IContextApp>({state : {} as IStateAppContext, dispatch : () => {} })


export const AppProvider = ({children} : {children : React.ReactNode}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (

        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>

    );


}