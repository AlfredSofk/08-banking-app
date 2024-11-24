import { IResGetDataClient } from "../../interfaces/requestApiTo";


export const getDataUserMapper = (getDataUser: any): IResGetDataClient => {

    const props = ["dinHeader", "dinBody", "dinError"];

    if (props.some(prop => !getDataUser[prop])) {
        throw new Error("LoginToken is missing some properties")
    }

    return {
        ...getDataUser
    }


}