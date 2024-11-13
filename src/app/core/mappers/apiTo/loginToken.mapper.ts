import { ILoginToken } from "../../interfaces/requestApiTo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginTokenMapper = (loginToken: any): ILoginToken => {
    const props = ["dinHeader", "dinBody", "dinError"];

    if (props.some(prop => !loginToken[prop])) {
        throw new Error("LoginToken is missing some properties")
    }


    return {
        ...loginToken
    };

}