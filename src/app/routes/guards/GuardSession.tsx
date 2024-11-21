import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../../core/utils/token";
import { useLoginToken } from "../../core/hooks/useLoginToken";


interface IGuardProps {
    children: ReactNode;
}


export const SessionGuard = ({ children }: IGuardProps) => {

    const {state, logoutUser} = useLoginToken()
    const token = sessionStorage.getItem('token')
    
    console.log({token, state})

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if(token){
            const isValid = validateToken(token)
            if(!isValid)logoutUser()
            
        }
    },[])

    useEffect(() => {
        
        if(token){
            const isValid = validateToken(token)
            if(!isValid)logoutUser()
            
        }
    },[token,state.isAuthenticated])

    

    if (!token) {
        return <Navigate to="/" replace />

    }


    return children;
};