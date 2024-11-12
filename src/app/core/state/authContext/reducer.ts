import { IActionAuth, IStateAuthContext } from "../../interfaces/state";
import { initialAuthState, loginCases } from "../login";


export const initialState = {...initialAuthState};

export const reducer = (state : IStateAuthContext, action : IActionAuth )=>{
    const cases = {...loginCases}
    return cases[action.type](state, action.payload) || state;
}                                                                               