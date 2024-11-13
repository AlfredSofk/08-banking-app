import { headers } from "../constants/headers";
import { HTTP_METHODS } from "../constants/httpMethods";
import { urlResources } from "../constants/urlResources";
import { IError } from "../interfaces/error";
import { ILoginToken } from "../interfaces/requestApiTo";
import { IBodyLoginToken, IDinBodyLoginToken } from "../interfaces/requestToApi";
import { loginTokenMapper } from "../mappers/apiTo/loginToken.mapper";
import { http } from "./generals/http";


export const getLoginToken = async ({ username, password }: IBodyLoginToken): Promise<ILoginToken | IError> => {

    const url = urlResources.generateToken

    const body: IDinBodyLoginToken = {
        dinHeader: { ...headers },
        dinBody: { username, password },
    }

    try {
        const response = await http(url, HTTP_METHODS.POST, body)
        return loginTokenMapper(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { message: error.message } as IError
    }

}