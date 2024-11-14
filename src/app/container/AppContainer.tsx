import { LayoutMain } from "../ui/layouts/LayaoutMain"
import App from '../../App';
import { Link } from "react-router-dom";
import { SideMenu } from '../ui/components/SideMenu/index';


export default function AppContainer() {

    return (
        <LayoutMain>
            <SideMenu />
            <App />
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/acerca'>Acerca</Link>
                <Link to='/'>Login</Link>
            </nav>
        </LayoutMain>

    )
}

