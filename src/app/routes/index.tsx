import { createHashRouter } from "react-router-dom";
import { AuthProvider } from "../core/state/authContext/AuthContext";
import { AppProvider } from '../core/state/appContext/AppContext';
import { SessionGuard } from './guards/GuardSession';
import AppContainer from "../container/AppContainer";
import Deposit from "../ui/components/Deposit";
import Dashboard from "../ui/components/Dashboard";
import LoginContainer from "../container/LoginContainer";

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
                path: "windraw",
                element: <h1>Windraw</h1>,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "deposit",
                element: <Deposit />,
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