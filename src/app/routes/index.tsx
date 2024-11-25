import { createHashRouter } from "react-router-dom";
import { AuthProvider } from "../core/state/authContext/AuthContext";
import { AppProvider } from '../core/state/appContext/AppContext';
import { SessionGuard } from './guards/GuardSession';
import AppContainer from "../container/AppContainer";
import LoginContainer from "../container/LoginContainer";
import { TransactionWrapper } from "../ui/components/TransactionWrapper";
import { TransactionTypes } from "../core/constants/transactionTypes";
import DashboardContainer from "../container/DashboardContainer";
import { ErrorScreen } from "../ui/components/Error";

export const routerDef = [
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
        errorElement  : <ErrorScreen errorDetails="Error al momento de realizar la petición" />,
        children: [
            {
                path: "inicio",
                index: true,
                element: <DashboardContainer />,
            },
            {
                path: TransactionTypes.WITHDRAW,
                element: <TransactionWrapper transactionType={TransactionTypes.WITHDRAW} />,
            },
            {
                path: TransactionTypes.DEPOSIT,
                element: <TransactionWrapper transactionType={TransactionTypes.DEPOSIT} />,
            },
            {
                path: TransactionTypes.DEPOSIT_ACCOUNT,
                element: <TransactionWrapper transactionType={TransactionTypes.DEPOSIT_ACCOUNT} />,
            },
            {
                path: TransactionTypes.TRANSFER,
                element: <TransactionWrapper transactionType={TransactionTypes.TRANSFER} />,
            },
            {
                path: TransactionTypes.PURCHASE_WEB,
                element: <TransactionWrapper transactionType={TransactionTypes.PURCHASE_WEB} />,
            },
            {
                path: TransactionTypes.PURCHASE_STORE,
                element: <TransactionWrapper transactionType={TransactionTypes.PURCHASE_STORE} />,
            },
            {
                path : "account",
                element : <h1>Account</h1>
            },
            {
                path : "about",
                element : <h1>About</h1>
            }
        ],
    },
    {
        path: "/",
        element: (
            <AuthProvider>
                <LoginContainer />
            </AuthProvider>
        ),
        errorElement  : <ErrorScreen errorDetails="Error al momento de realizar login" />,
    },
    { path: "*", element: <h1>404</h1> },
];

export const hashRouter = createHashRouter(routerDef)