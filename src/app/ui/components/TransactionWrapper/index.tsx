import { TransactionTypes } from '../../../core/constants/transactionTypes';
import { Withdraw } from "../Withdraw";
import { useTransactions } from '../../../core/hooks/useTransaction';


interface Props {
  transactionType: string;
  // children: ReactNode | ReactNode[];
}

export const TransactionWrapper = ({ transactionType }: Props) => {

  const { state, retiroCajeroATM, depositarCajeroATM, depositarAgencia } = useTransactions()
  console.log({ transactionType })
  return (
    <>
      {(() => {
        switch (transactionType.toLowerCase()) {
          case TransactionTypes.WITHDRAW:
            return <Withdraw typeTransactionATM='retiro ATM' state={state} transactionHook={retiroCajeroATM} esRetiro={true} />;
          case TransactionTypes.DEPOSIT:
            return <Withdraw typeTransactionATM='deposito ATM' state={state} transactionHook={depositarCajeroATM} esRetiro={false}/>;
          case TransactionTypes.DEPOSIT_ACCOUNT:
            return <Withdraw typeTransactionATM='deposito Agencia' state={state} transactionHook={depositarAgencia} esRetiro={false} />;
          //   case 'depositar cajero':
          //     return <Deposit />;
          //   case 'deposito':
          //     return <Deposit />;
          //   case 'transferencias':
          //     return <Transfer />;
          //   case 'compra web':
          //     return <WebPurchase />;
          //   case 'compra establecimiento':
          //     return <StorePurchase />;
          default:
            return <div>No se encontró el tipo de transacción</div>;
        }
      })()}
    </>


  )


}