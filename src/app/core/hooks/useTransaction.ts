import { useContext } from "react"
import { AppContext } from "../state/appContext/AppContext"
import { deposit, depositAccount, errorTransaction, loadingBankAccount, purchase, purchaseLocal, transfer, withdraw } from "../state/bank-account/action"
import { doTransaction } from "../services/doTransaction"
import { TransactionNames } from "../constants/transactionTypes"
import { IFormBodyTransaction } from "../interfaces/requestToApi"
import { IResDataTransaction } from "../interfaces/requestApiTo"



export const useTransactions = () => {

    const { state, dispatch } = useContext(AppContext)
    // const navigate = useNavigate();

    const retiroCajeroATM = (data: IFormBodyTransaction) => {

        if(Object.keys(data).length > 0){
            dispatch(loadingBankAccount(true))
    
            const impactAccount: string = data.accountNumber
            doTransaction(TransactionNames.WITHDRAWATM, data).then((response) => {
    
                console.log(impactAccount)
                if ("message" in response) {
                    dispatch(errorTransaction(response.message))
                    return
                }
    
                dispatch(withdraw(response as IResDataTransaction, impactAccount))
                dispatch(loadingBankAccount(false))
                alert("Se ha realizado el retiro con exito")
            })
        }
    }

    const depositarCajeroATM = (data: IFormBodyTransaction) => {
        if(Object.keys(data).length > 0){
            dispatch(loadingBankAccount(true))
            const impactAccount: string = data.accountNumber
            doTransaction(TransactionNames.DEPOSITATM, data).then((response) => {
                if ("message" in response) {
                    dispatch(errorTransaction(response.message))
                    return
                }
    
                dispatch(deposit(response as IResDataTransaction, impactAccount))
                dispatch(loadingBankAccount(false))
                alert("Se ha realizado el deposito ATM con exito")
            })
        }
    }

    const depositarAgencia = (data : IFormBodyTransaction) => {
        if(Object.keys(data).length > 0){
            dispatch(loadingBankAccount(true))
    
            const impactAccount: string = data.accountNumber
            doTransaction(TransactionNames.DEPOSITACCOUNT, data).then((response) => {
                if ("message" in response) {
                    dispatch(errorTransaction(response.message))
                    return
                }
                dispatch(depositAccount(response as IResDataTransaction, impactAccount))
                dispatch(loadingBankAccount(false))
                alert("Se ha realizado la transferencia Agencia con exito")
            })
    
        }
    }

    const transferencias = (data: IFormBodyTransaction) => {
        if(Object.keys(data).length > 0){
            dispatch(loadingBankAccount(true))
    
            const impactAccount: string = data.accountNumber
            const destinyAccount: string = data.accountNumberReceiver
            doTransaction(TransactionNames.DEPOSITTRANSFER, data).then((response) => {
                if ("message" in response) {
                    dispatch(errorTransaction(response.message))
                    return
                }
    
                dispatch(transfer(response as IResDataTransaction, impactAccount, destinyAccount))
                dispatch(loadingBankAccount(false))
                alert('Deposito de Transferencia realizada exitosamente')
            })
        }       
    }

    const compraWeb = (data: IFormBodyTransaction) => {
        if(Object.keys(data).length > 0){
            dispatch(loadingBankAccount(true))
            const impactAccount: string = data.accountNumber
            doTransaction(TransactionNames.PURCHASEWEB, data).then((response) => {
    
                if ("message" in response) {
                    dispatch(errorTransaction(response.message))
                    return
                }
    
                dispatch(purchase(response as IResDataTransaction, impactAccount))
                dispatch(loadingBankAccount(false))
                alert('Compra web realizada exitosamente')
            })
        }
    }

    const compraEstablecimiento = (data : IFormBodyTransaction) =>{
        if(Object.keys(data).length > 0){
            dispatch(loadingBankAccount(true))
            const impactAccount : string = data.accountNumber
            doTransaction(TransactionNames.PURCHASELOCAL, data).then((response) => {
                if("message" in response){
                    dispatch(errorTransaction(response.message))
                    return
                }
    
                dispatch(purchaseLocal(response as IResDataTransaction, impactAccount))
                dispatch(loadingBankAccount(false))
                alert('Compra Establecimiento realizada exitosamente')
            })
        }
    }

    return {    
        state,
        dispatch,
        retiroCajeroATM,
        depositarCajeroATM,
        depositarAgencia,
        transferencias,
        compraWeb, 
        compraEstablecimiento 
    }
}