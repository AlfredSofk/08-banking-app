import { FaDollarSign } from "react-icons/fa";
import './style.scss';

export const GeneralBalance = ({ balance }: { balance: number }) => {

    return (
        <div className="general-balance">
        <h3 className="general-balance__title">Balance General</h3>
        <div className="general-balance__content">
          <FaDollarSign aria-hidden="true" className="general-balance__amount"/>
          <p className="general-balance__amount" role="general-balance">{balance.toFixed(2)}</p>
        </div>
      </div>
    )

}