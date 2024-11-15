import { TransactionTypes } from "../../../core/constants/transactionTypes";
import { Withdraw } from "../Withdraw";


interface Props {
    transactionType: string;
    // children: ReactNode | ReactNode[];
}

export const TransactionWrapper = ({transactionType} : Props) => {

    console.log({transactionType})
    return (
    <>
        <h3 style={{textTransform: 'capitalize'}}>{transactionType}</h3>
        {(() => {
        switch (transactionType.toLowerCase()) {
          case TransactionTypes.WITHDRAW:
            return <Withdraw />;
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
        //   default:
            return <div>No se encontró el tipo de transacción</div>;
        }
      })()}
    </>


)


}