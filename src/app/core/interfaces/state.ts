import { IAuthState } from "./auth";
import { IAppState } from "./bankAccount";

export interface IContextApp {
    state : IStateAppContext
    dispatch : React.Dispatch<IActionApp>
}

export interface IStateAppContext extends IAppState {}

export interface IActionApp {
    type : string;
    payload : any;
}




export interface IContextAuth {
    state : IStateAuthContext
    dispatch : React.Dispatch<IActionAuth>
}

export interface IStateAuthContext extends IAuthState {}

export interface IActionAuth {
    type : string;
    payload : any;
}