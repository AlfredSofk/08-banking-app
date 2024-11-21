import { IAuthState } from "./auth";
import { IAppState } from "./bankAccount";

export interface IContextApp {
    state: IStateAppContext
    dispatch: React.Dispatch<IActionApp>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IStateAppContext extends IAppState { }

export interface IActionApp {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
}




export interface IContextAuth {
    state: IStateAuthContext
    dispatch: React.Dispatch<IActionAuth>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IStateAuthContext extends IAuthState { }

export interface IActionAuth {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
}