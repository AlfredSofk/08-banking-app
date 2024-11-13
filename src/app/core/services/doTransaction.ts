import { HTTP_METHODS } from "../constants/httpMethods"
import { urlResources } from "../constants/urlResources"
import { http } from "./generals/http"

const doTransaction = async (transaction : string) => {
    const url = urlResources.getTransaction(transaction)

    try {
        const response = await http(url, HTTP_METHODS.POST)

        if(response.ok) {
            return response.json()
        }
        // return response.json()
    } catch (error : any) {
        throw new Error(error?.message ?? "Something went wrong")
    }
    // const response = await http(url, HTTP_METHODS.POST)



    // throw new Error("Something went wrong")
}