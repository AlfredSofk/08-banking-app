import { LayoutMain } from "../ui/layouts/LayaoutMain"
import App from '../../App';
import { Link } from "react-router-dom";


export default function AppContainer() {

    return (
        <LayoutMain>
            <App />
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/acerca'>Acerca</Link>
            </nav>
            <h1>Hola desde Layout</h1>
        </LayoutMain>

    )
}

