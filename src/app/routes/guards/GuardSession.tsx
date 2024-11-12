import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface IGuardProps {
    children: ReactNode;
}


export const SessionGuard = ({ children }: IGuardProps) => {

    // const { state } = useContext(AuthContext);

    const { currentUser } = { currentUser: true }

    if (!currentUser) {
        return <Navigate to="/login" replace />

    }

    return children;
};