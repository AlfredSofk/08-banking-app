import { useContext } from "react"
import { AppContext } from "../state/appContext/AppContext"
import { useNavigate } from "react-router-dom"
import { deposit, depositAccount, errorTransaction, loadingBankAccount, transfer, withdraw } from "../state/bank-account/action"
import { doTransaction } from "../services/doTransaction"
import { TransactionNames } from "../constants/transactionTypes"
import { IFormBodyTransaction } from "../interfaces/requestToApi"
import { IResDataTransaction } from "../interfaces/requestApiTo"



export const useTransactions = () => {

    const { state, dispatch } = useContext(AppContext)
    // const navigate = useNavigate();

    const retiroCajeroATM = (data: IFormBodyTransaction) => {
        dispatch(loadingBankAccount(true))

        const impactAccount: string = data.accountNumber
        doTransaction(TransactionNames.WITHDRAWATM, data).then((response) => {

            console.log(impactAccount)
            if ("message" in response) {
                dispatch(errorTransaction(response.message))
            }

            dispatch(withdraw(response as IResDataTransaction, impactAccount))
            dispatch(loadingBankAccount(false))
            alert("Se ha realizado el retiro con exito")
        })
    }

    const depositarCajeroATM = (data: IFormBodyTransaction) => {
        dispatch(loadingBankAccount(true))
        console.log("se realizo la ejecución del deposito")

        const impactAccount: string = data.accountNumber
        doTransaction(TransactionNames.DEPOSITATM, data).then((response) => {
            if ("message" in response) {
                dispatch(errorTransaction(response.message))
            }

            dispatch(deposit(response as IResDataTransaction, impactAccount))
            dispatch(loadingBankAccount(false))
            alert("Se ha realizado el deposito ATM con exito")
        })
    }

    const depositarAgencia = (data : IFormBodyTransaction) => {
        dispatch(loadingBankAccount(true))

        const impactAccount: string = data.accountNumber
        doTransaction(TransactionNames.DEPOSITACCOUNT, data).then((response) => {
            if ("message" in response) {
                dispatch(errorTransaction(response.message))
            }
            dispatch(depositAccount(response as IResDataTransaction, impactAccount))
            dispatch(loadingBankAccount(false))
            alert("Se ha realizado la transferencia Agencia con exito")
        })

    }

    const transferencias = (data: IFormBodyTransaction) => {
        dispatch(loadingBankAccount(true))

        const impactAccount: string = data.accountNumber
        const destinyAccount: string = data.accountNumberReceiver
        doTransaction(TransactionNames.DEPOSITTRANSFER, data).then((response) => {
            if ("message" in response) {
                dispatch(errorTransaction(response.message))
            }

            dispatch(transfer(response as IResDataTransaction, impactAccount, destinyAccount))
            dispatch(loadingBankAccount(false))
            alert('Deposito de Transferencia realizada exitosamente')
        })

    }

    return { state, dispatch, retiroCajeroATM, depositarCajeroATM, depositarAgencia, transferencias }
}