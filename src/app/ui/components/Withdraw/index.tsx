
import { useForm } from 'react-hook-form';
import './style.scss'


interface Props {
  typeTransactionATM: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  esRetiro: boolean
  transactionHook: (data: any) => void
}


export const Withdraw = ({ typeTransactionATM, esRetiro, transactionHook }: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm();


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(typeTransactionATM)
    console.log('Datos de retiro:', data);
    transactionHook(data)
  };

  return (
    <section className="withdrawal" aria-labelledby="withdrawal-heading">
      <h2 id="withdrawal-heading" className="withdrawal__title">{typeTransactionATM} </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="withdrawal__form" noValidate>

        <div className="withdrawal__form-group">
          <label htmlFor="accountNumber" className="withdrawal__label">Número de Cuenta</label>
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

        <div className="withdrawal__form-group">
          <label htmlFor="amount" className="withdrawal__label">Monto a {esRetiro ? 'Retirar' : 'Depositar'}</label>
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

        <button type="submit" className="withdrawal__submit">{esRetiro ? 'Retirar' : 'Depositar'}</button>
      </form>
    </section>
  );
};
