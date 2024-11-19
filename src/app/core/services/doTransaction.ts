import { HTTP_METHODS } from "../constants/httpMethods"
import { urlResources } from "../constants/urlResources"
import { http } from "./generals/http"
import { IError } from '../interfaces/error';
import { getCookie } from "../utils/cookies";
import { IFormBodyTransaction, IRequestBodyTransaction } from '../interfaces/requestToApi';
import { headers } from "../constants/headers";
import { TransactionNames } from "../constants/transactionTypes";
import { IResDataTransaction } from "../interfaces/requestApiTo";
import { transactionMapper } from "../mappers/apiTo/transaction.mapper";

export const doTransaction = async (transaction: string, body: IFormBodyTransaction): Promise<IResDataTransaction | IError> => {
    const url = urlResources.getTransaction(transaction)

    console.log({transaction, body})
    console.log(TransactionNames.DEPOSITATM, TransactionNames.DEPOSITACCOUNT)
    const bodyRequest = []

    if (transaction === TransactionNames.WITHDRAWATM) {
        console.log("Ingreso a la condicion de retiro ATM")
        const bodyRe: IRequestBodyTransaction = {
            dinHeader: { ...headers },
            dinBody: {
                accountNumber: body.accountNumber,
                amount: body.amount
            }
        }
        bodyRequest.push(bodyRe)
    }

    if (transaction === TransactionNames.DEPOSITATM || TransactionNames.DEPOSITACCOUNT) {
        console.log("Ingreso a la doble condicion")
        const bodyRe: IRequestBodyTransaction = {
            dinHeader: { ...headers },
            dinBody: {
                accountNumberClient: body.accountNumber,
                amount: body.amount
            }
        }
        bodyRequest.push(bodyRe)
    }

    if(transaction === TransactionNames.DEPOSITTRANSFER) {
        console.log("Ingreso a este punto")
        const bodyRe: IRequestBodyTransaction = {
            dinHeader: { ...headers },
            dinBody: {
                accountNumberSender: body.accountNumber,
                accountNumberReceiver: body.accountNumberReceiver,
                amount: body.amount,
            }
        }
        bodyRequest.push(bodyRe)
    }

    console.log(bodyRequest[0]);
    const token = getCookie('token');

    try {
        const response = await http(url, HTTP_METHODS.POST, bodyRequest[0], token)
        return transactionMapper(response)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { message: error.message } as IError
    }
}