
import LoginForm from "../ui/components/Login"
import { useLoginToken } from "../core/hooks/useLoginToken"

export default function LoginContainer() {

    const { state , loginUser} = useLoginToken()

    console.log({state})
    
    return <LoginForm state={state} loginUser={loginUser} />
}