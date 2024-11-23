
import { useForm } from 'react-hook-form';
import './style.scss'
import { IAppState } from '../../../core/interfaces/bankAccount';
import { TransactionTargets } from '../../../core/constants/transactionTypes';
import { Loader } from '../Loader/index';
import { useEffect } from 'react';


interface Props {
  state : IAppState
  titleTransaction: string
  transactionTarget: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactionHook: (data: any) => void
}


export const Transaction = ({ state,titleTransaction,  transactionTarget, transactionHook }: Props) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(titleTransaction)
    console.log('Datos de retiro:', data);
    transactionHook(data)
    reset()
  };

  
  useEffect(() => {
    reset()
  }, [])

  return (
    <section className="withdrawal" aria-labelledby="withdrawal-heading">
      <h2 id="withdrawal-heading" className="withdrawal__title" data-testid="title-transaction">{titleTransaction} </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="withdrawal__form" noValidate>

        <div className="withdrawal__form-group">
          <label htmlFor="accountNumber" className="withdrawal__label">{transactionTarget == TransactionTargets.TRANSFERENCIA ? 'Cuenta principal' : 'Número de Cuenta'}</label>
          <input
            id="accountNumber"
            type="text"
            className="withdrawal__input"
            {...register('accountNumber', {
              required: 'El número de cuenta es requerido',
              // pattern: {
              //   value: /^[0-9]}$/,
              //   message: 'El número de cuenta debe tener 10 dígitos'
              // }
            })}
            aria-invalid={errors.accountNumber ? "true" : "false"}
            aria-describedby="accountNumber-error"
          />
          {errors.accountNumber && (
            <span id="accountNumber-error" className="withdrawal__error" role="alert">
              {errors.accountNumber.message}
            </span>
          )}
        </div>
        
        {transactionTarget === TransactionTargets.TRANSFERENCIA  &&
          <div className="withdrawal__form-group">
            <label htmlFor="accountNumberReceiver" className="withdrawal__label">{transactionTarget == TransactionTargets.TRANSFERENCIA ? 'Cuenta destino' : 'Número de Cuenta'}</label>
            <input
              id="accountNumberReceiver"
              type="text"
              className="withdrawal__input"
              {...register('accountNumberReceiver', {
                required: 'El número de cuenta es requerido',
                // pattern: {
                //   value: /^[0-9]}$/,
                //   message: 'El número de cuenta debe tener 10 dígitos'
                // }
              })}
              aria-invalid={errors.accountNumberReceiver ? "true" : "false"}
              aria-describedby="accountNumberReceiver-error"
            />
            {errors.accountNumberReceiver && (
              <span id="accountNumberReceiver-error" className="withdrawal__error" role="alert">
                {errors.accountNumber.message}
              </span>
            )}
          </div>   
        }

        <div className="withdrawal__form-group">
          <label htmlFor="amount" className="withdrawal__label">{`Monto a ${transactionTarget}`}</label>
          <input
            id="amount"
            type="number"
            step="1"
            className="withdrawal__input"
            {...register('amount', {
              required: 'El monto es requerido',
              min: {
                value: 1,
                message: 'El monto debe ser mayor a 0',
              },
              valueAsNumber: true
            })}
            aria-invalid={errors.amount ? "true" : "false"}
            aria-describedby="amount-error"
          />
          {errors.amount && (
            <span id="amount-error" className="withdrawal__error" role="alert">
              {errors.amount.message}
            </span>
          )}
        </div>
          
          { state.loading 
            ? <Loader />
            :<button type="submit" className="withdrawal__submit" role='buttonTransaction'>{`Monto a ${transactionTarget}`}</button>
          }
      </form>
    </section>
  );
};
