import { useContext } from "react"
import { AppContext } from "../core/state/appContext/AppContext"
import { Dashboard } from "../ui/components/Dashboard"



export default function DashboardContainer() {

    const {state} = useContext(AppContext)

    return(
        <Dashboard state={state}/>
    )


}