import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../core/state/authContext/AuthContext";


interface IGuardProps {
    children: ReactNode;
}


export const SessionGuard = ({ children }: IGuardProps) => {

    // const { state } = useContext(AuthContext);

    const { currentUser } = { currentUser: true }

    //   state.isAuthenticated

    // if (!state.isAuthenticated) {
    //     return <Navigate to="/" replace />

    // }

    if (!currentUser) {
        return <Navigate to="/" replace />
    }
    return children;
};