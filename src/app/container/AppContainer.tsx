import { SessionGuard } from "../routes/guards/GuardSession"
import { LayoutMain } from "../ui/layouts/LayaoutMain"


export default function AppContainer() {

    return (
        <LayoutMain>
            <h1>Hola desde Layout</h1>
        </LayoutMain>

    )
}

