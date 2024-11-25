import { IActionApp, IStateAppContext } from "../../interfaces/state";
import { bankAccountCases, initialAppState } from "../bank-account";


export const initialState = {...initialAppState};

export const reducer = (state : IStateAppContext, action : IActionApp )=>{
    const cases = {...bankAccountCases}
    return cases[action.type](state, action.payload) || state;
}
