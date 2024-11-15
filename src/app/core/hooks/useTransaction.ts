import { useContext } from "react"
import { AppContext } from "../state/appContext/AppContext"
import { useNavigate } from "react-router-dom"
import { errorTransaction, loadingBankAccount, withdraw } from "../state/bank-account/action"
import { doTransaction } from "../services/doTransaction"
import { TransactionNames } from "../constants/transactionTypes"
import { IFormBodyTransaction } from "../interfaces/requestToApi"
import { IResDataTransaction } from "../interfaces/requestApiTo"



export const useTransactions = () => {

    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate();

    const retiroCajeroATM = (data: IFormBodyTransaction) => {
        dispatch(loadingBankAccount(true))
        console.log("se realizo la ejecución del retiro")

        doTransaction(TransactionNames.WITHDRAWATM, data).then((response) => {
            if ("message" in response) {
                dispatch(errorTransaction(response.message))
            }

            dispatch(withdraw(response as IResDataTransaction))
        })
    }


    const depositarCajeroATM = (data: IFormBodyTransaction) => {
        dispatch(loadingBankAccount(true))
        console.log("se realizo la ejecución del deposito")

        // doTransaction(TransactionNames.DEPOSITATM, data).then((response) => {
        //     if ("message" in response) {
        //         dispatch(errorTransaction(response.message))
        //     }

        //     dispatch(deposit(response as IResDataTransaction))
        // })
    }

    return { state, dispatch, retiroCajeroATM, depositarCajeroATM }
}