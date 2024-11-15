import { IRequestBodyGetDataClient } from "../interfaces/requestToApi"


export const getDataClient = async ({dinHeader, dinBody} : IRequestBodyGetDataClient): Promise< IResGetDataClient| IError> => {
    const url = urlResources.getClientData

    try {
        const response = await http(url, HTTP_METHODS.POST, {} , token )
        return response as IClient
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { message: error.message } as IError
    }
}