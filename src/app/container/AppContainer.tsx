import { LayoutMain } from "../ui/layouts/LayaoutMain"
import { Outlet } from "react-router-dom";
import { SideMenu } from '../ui/components/SideMenu/index';
import { TopBar } from "../ui/components/TopBar";
import { useEffect, memo, useMemo } from 'react';
import { useApp } from "../core/hooks/useApp";
import { getCookie } from "../core/utils/cookies";
import { routerDef as routes } from "../routes";


export default function AppContainer() {

    const username: string = getCookie('username')
    const { getDataClient } = useApp()

    const routerDef = useMemo(() => routes, [routes])

    useEffect(() => {
        getDataClient(username)
    }, [])

    // console.log({routerDef})

    return (
        <LayoutMain>
            <SideMenu routerDef={routerDef} />
            <div className="layout__content">
                <TopBar />
                <div className="layout__main">
                    <Outlet />
                </div>
            </div>
        </LayoutMain>

    )
}

