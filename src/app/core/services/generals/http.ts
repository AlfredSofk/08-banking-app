import { HTTP_METHODS } from "../../constants/httpMethods";

export const http = async (url : string, method : HTTP_METHODS, body? : any) => {
    return await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}