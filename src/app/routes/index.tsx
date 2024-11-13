import { createHashRouter } from "react-router-dom";
import { AuthProvider } from "../core/state/authContext/AuthContext";
import { AppProvider } from '../core/state/appContext/AppContext';
import { SessionGuard } from './guards/GuardSession';
import AppContainer from "../container/AppContainer";
import Login from "../ui/components/Login";
import Deposit from "../ui/components/Deposit";
import Dashboard from "../ui/components/Dashboard";

export const router = createHashRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <AppProvider>
                    <SessionGuard>
                        <AppContainer />
                    </SessionGuard>
                </AppProvider>
            </AuthProvider>
        ),
        children: [
            {
                path: "home",
                element: <h1>Home</h1>,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "/deposit",
                element: <Deposit />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    { path: "*", element: <h1>404</h1> },
]);