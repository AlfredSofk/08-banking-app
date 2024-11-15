import { LayoutMain } from "../ui/layouts/LayaoutMain"
import { Outlet } from "react-router-dom";
import { SideMenu } from '../ui/components/SideMenu/index';
import { TopBar } from "../ui/components/TopBar";
import { useEffect } from "react";
import { useApp } from "../core/hooks/useApp";
import { getCookie } from "../core/utils/cookies";


export default function AppContainer() {

    const username: string = getCookie('username')
    const { getDataClient } = useApp()


    useEffect(() => {
        getDataClient(username)
    }, [])

    return (
        <LayoutMain>
            <SideMenu />
            <div className="layout__content">
                <TopBar />
                <div className="layout__main">
                    <Outlet />
                </div>
            </div>
        </LayoutMain>

    )
}

