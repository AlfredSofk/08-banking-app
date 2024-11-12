import { ReactNode } from "react";



interface Props { 
    children : ReactNode | ReactNode[];
}

export const LayoutMain = ({children} : Props) => {
    return (
        <section className="layout-main">
            {children}
        </section>
    );
}