import { TransactionTypes, TransactionTypesTitle } from "../../../core/constants/transactionTypes"

interface Props {
    path : string
    handleNavigate : (path : string) => void 
}

export const TransactionItem = ({path, handleNavigate} : Props) => {

    return (
        <li className="sidebar__submenu-item">
            <button className="sidebar__submenu-button" onClick={() => handleNavigate(path)}>
                {TransactionTypesTitle[`${path}`]}
            </button>
        </li>
    )

}