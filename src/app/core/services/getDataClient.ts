import { IDinBodyGetDataClient, IRequestBodyGetDataClient } from "../interfaces/requestToApi"
import { headers } from '../constants/headers';
import { http } from "./generals/http";
import { IError } from "../interfaces/error";
import { getDataUserMapper } from "../mappers/apiTo/getDataUser.mapper";
import { HTTP_METHODS } from "../constants/httpMethods";
import { urlResources } from "../constants/urlResources";
import { IResGetDataClient } from "../interfaces/requestApiTo";
import { getCookie } from "../utils/cookies";


export const getClientData = async ({ username }: IDinBodyGetDataClient): Promise<IResGetDataClient | IError> => {
    const url = urlResources.getClientData

    const body: IRequestBodyGetDataClient = {
        dinHeader: { ...headers },
        dinBody: {
            username
        }
    }

    const token = getCookie('token')
    try {
        const response = await http(url, HTTP_METHODS.POST, body, token)
        return getDataUserMapper(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { message: error.message } as IError
    }
}