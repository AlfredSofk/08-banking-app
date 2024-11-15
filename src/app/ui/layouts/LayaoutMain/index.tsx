import { ReactNode } from "react";
import './style.scss';
import { SideMenu } from "../../components/SideMenu";
import { TopBar } from "../../components/TopBar";


interface Props {
    children: ReactNode | ReactNode[];
}

export const LayoutMain = ({ children }: Props) => {
    return (

        <main className="layout">
            {children}
        </main>
   
    );
}