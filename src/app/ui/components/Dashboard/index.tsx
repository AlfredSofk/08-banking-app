import { IAppState } from "../../../core/interfaces/bankAccount";
import { AccountCard } from "../AccountCard";
import { GeneralBalance } from "../GeneralBalance";
import './style.scss'

interface Props { 
    state : IAppState
}


export const Dashboard = ({state} : Props) => {

    const {userAccounts, saldoGlobal} = state

    return (
        <section className="accounts-overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="accounts-overview__title" role="heading">Resumen de Cuentas</h2>
        <GeneralBalance balance={saldoGlobal} />
        <div className="accounts-overview__accounts">
          {userAccounts.length === 0 && <p>No hay cuentas disponibles</p>}
          {userAccounts.map((account, index) => (
            <AccountCard
              key={index}
            //   accountName={get}
              accountNumber={account.number}
              balance={account.amount}
            />
          ))}
        </div>
      </section>
    )

}