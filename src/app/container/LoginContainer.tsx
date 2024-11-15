
import LoginForm from "../ui/components/Login"
import { useLoginToken } from "../core/hooks/useLoginToken"
import { Navigate } from "react-router-dom"

export default function LoginContainer() {

    const { state, loginUser } = useLoginToken()

    if (state.token && state.isAuthenticated) {
        return <Navigate to={'/home/inicio'} replace />
    }

    return <LoginForm state={state} loginUser={loginUser} />
}