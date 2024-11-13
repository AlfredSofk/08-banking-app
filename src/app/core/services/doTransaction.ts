import { HTTP_METHODS } from "../constants/httpMethods"
import { urlResources } from "../constants/urlResources"
import { http } from "./generals/http"
import { ITransaction } from '../interfaces/transaction';
import { IError } from '../interfaces/error';

const doTransaction = async (transaction: string): Promise<ITransaction | IError> => {
    const url = urlResources.getTransaction(transaction)

    try {
        const response = await http(url, HTTP_METHODS.POST)
        return response as ITransaction
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { message: error.message } as IError
    }
}