import {
  TransactionTypes,
  TransactionTargets,
} from "../../../core/constants/transactionTypes";
import { Transaction } from "../Withdraw";
import { useTransactions } from "../../../core/hooks/useTransaction";

interface Props {
  transactionType: string;
  // children: ReactNode | ReactNode[];
}

export const TransactionWrapper = ({ transactionType }: Props) => {
  const {
    state,
    retiroCajeroATM,
    depositarCajeroATM,
    depositarAgencia,
    transferencias,
    compraWeb,
    compraEstablecimiento,
  } = useTransactions();
  console.log({ transactionType });
  return (
    <>
      {(() => {
        switch (transactionType) {
          case TransactionTypes.WITHDRAW:
            return (
              <Transaction
                titleTransaction="retiro ATM"
                state={state}
                transactionHook={retiroCajeroATM}
                transactionTarget={TransactionTargets.RETIRO}
              />
            );
          case TransactionTypes.DEPOSIT:
            return (
              <Transaction
                titleTransaction="deposito ATM"
                state={state}
                transactionHook={depositarCajeroATM}
                transactionTarget={TransactionTargets.DEPOSITO}
              />
            );
          case TransactionTypes.DEPOSIT_ACCOUNT:
            return (
              <Transaction
                titleTransaction="deposito Agencia"
                state={state}
                transactionHook={depositarAgencia}
                transactionTarget={TransactionTargets.DEPOSITO}
              />
            );
          case TransactionTypes.TRANSFER:
            return (
              <Transaction
                titleTransaction="Tranferencia"
                state={state}
                transactionHook={transferencias}
                transactionTarget={TransactionTargets.TRANSFERENCIA}
              />
            );
          case TransactionTypes.PURCHASE_WEB:
            return (
              <Transaction
                titleTransaction="Compra Web"
                state={state}
                transactionHook={compraWeb}
                transactionTarget={TransactionTargets.COMPRA}
              />
            );
          case TransactionTypes.PURCHASE_STORE:
            return (
              <Transaction
                titleTransaction="Compra Establecimiento"
                state={state}
                transactionHook={compraEstablecimiento}
                transactionTarget={TransactionTargets.COMPRA}
              />
            );
          default:
            return <div>No se encontró el tipo de transacción</div>;
        }
      })()}
    </>
  );
};
