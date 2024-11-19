

import { decryptAES } from '../../../core/utils/decoder'
import './style.scss'

interface Props {
    accountNumber : string,
    balance: number
}

export const AccountCard = ({accountNumber, balance} : Props) => {
    return (
        <div className="account-card">
            {/* <h3 className="account-card__title">{accountName}</h3> */}
            <p className="account-card__number">Número de Cuenta: {accountNumber}</p>
            <p className="account-card__balance">Saldo: ${balance.toFixed(2)}</p>
        </div>
    )
}