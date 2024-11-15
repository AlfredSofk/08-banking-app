import { LayoutMain } from "../ui/layouts/LayaoutMain"
import App from '../../App';
import { Outlet } from "react-router-dom";
import { SideMenu } from '../ui/components/SideMenu/index';
import { ReactNode } from "react";
import { TopBar } from "../ui/components/TopBar";


export default function AppContainer() {	 

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

