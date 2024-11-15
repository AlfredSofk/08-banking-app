import { TransactionTypes } from '../../../core/constants/transactionTypes';
import { Withdraw } from "../Withdraw";
import { useTransactions } from '../../../core/hooks/useTransaction';


interface Props {
  transactionType: string;
  // children: ReactNode | ReactNode[];
}

export const TransactionWrapper = ({ transactionType }: Props) => {

  const { retiroCajeroATM, depositarCajeroATM } = useTransactions()
  console.log({ transactionType })
  return (
    <>
      {(() => {
        switch (transactionType.toLowerCase()) {
          case TransactionTypes.WITHDRAW:
            return <Withdraw typeTransactionATM='retiro' transactionHook={retiroCajeroATM} />;
          case TransactionTypes.DEPOSIT:
            return <Withdraw typeTransactionATM='deposito' transactionHook={depositarCajeroATM} />;
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