import { IResDataTransaction } from "../../interfaces/requestApiTo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transactionMapper = (res: any): IResDataTransaction => {
    const props = ["dinHeader", "dinBody", "dinError"];

    if (props.some(prop => !res[prop])) {
        throw new Error("LoginToken is missing some properties")
    }

    return {
        ...res
    }

}