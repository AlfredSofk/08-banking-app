import { createHashRouter } from "react-router-dom";
import { AuthProvider } from "../core/state/authContext/AuthContext";
import { AppProvider } from '../core/state/appContext/AppContext';
import { SessionGuard } from './guards/GuardSession';
import AppContainer from "../container/AppContainer";
import LoginContainer from "../container/LoginContainer";
import { TransactionWrapper } from "../ui/components/TransactionWrapper";
import { TransactionTypes } from "../core/constants/transactionTypes";
import DashboardContainer from "../container/DashboardContainer";

export const router = createHashRouter([
    {
        path: "/home",
        element: (
            <AuthProvider>
                <SessionGuard>
                    <AppProvider>
                        <AppContainer />
                    </AppProvider>
                </SessionGuard>
            </AuthProvider>
        ),
        children: [
            {
                path: "inicio",
                index: true,
                element: <DashboardContainer />,
            },
            {
                path: "withdraw",
                element: <TransactionWrapper transactionType={TransactionTypes.WITHDRAW} />,
            },
            {
                path: "depositATM",
                element: <TransactionWrapper transactionType={TransactionTypes.DEPOSIT} />,
            },
        ],
    },
    {
        path: "/",
        element: (
            <AuthProvider>
                <LoginContainer />
            </AuthProvider>
        )
    },
    { path: "*", element: <h1>404</h1> },
]);