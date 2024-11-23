import { useContext } from "react"
import { AppContext } from "../state/appContext/AppContext"
import { getClientData } from "../services/getDataClient"
import { errorGetDataAccount, getDataUser, loadingBankAccount } from "../state/bank-account/action"
import { IResGetDataClient } from "../interfaces/requestApiTo"



export const useApp = () => {

    const { state, dispatch } = useContext(AppContext)

    const getDataClient = (username: string) => {
        if(username !== ""){
            dispatch(loadingBankAccount(true))
            getClientData({ username }).then((response) => {
                if ("message" in response) {
                    dispatch(errorGetDataAccount(response.message))
                }
                dispatch(getDataUser(response as IResGetDataClient))
            })
        }
    }

    return { state, getDataClient }

}