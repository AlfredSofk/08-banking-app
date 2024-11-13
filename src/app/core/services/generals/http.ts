import { HTTP_METHODS } from "../../constants/httpMethods";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const http = async (url: string, method: HTTP_METHODS, body?: any) => {

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
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

