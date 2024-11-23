import { HTTP_METHODS } from "../../constants/httpMethods";
import { getCookie } from "../../utils/cookies";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const http = async (url: string, method: HTTP_METHODS, body?: any, token?: string) => {

    let headersHttp = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

    }

    const cookieToken = getCookie('token')

    if(cookieToken){
        headersHttp.Authorization = `Bearer ${cookieToken}`
    }


    
    console.log(headersHttp)

    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...headersHttp
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            return response.json()
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error?.message ?? "Something went wrong")
    }
}

