import { ReactNode } from "react";
import './style.scss';


interface Props {
    children: ReactNode | ReactNode[];
}

export const LayoutMain = ({ children }: Props) => {
    return (
        <main className="layout-main">
            {children}
        </main>
    );
}