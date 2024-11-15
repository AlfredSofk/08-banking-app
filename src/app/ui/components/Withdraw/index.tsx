
import { useForm } from 'react-hook-form';
import './style.scss'
export const Withdraw = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Aquí haces la llamada a la API con el monto y el número de cuenta
    console.log('Datos de retiro:', data);
    // Llamada al API (ajusta la URL y configuración según sea necesario)
    // fetch('/api/withdrawal', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <section className="withdrawal" aria-labelledby="withdrawal-heading">
      <h2 id="withdrawal-heading" className="withdrawal__title">Retiro de Efectivo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="withdrawal__form" noValidate>
        
        <div className="withdrawal__form-group">
          <label htmlFor="accountNumber" className="withdrawal__label">Número de Cuenta</label>
          <input
            id="accountNumber"
            type="text"
            className="withdrawal__input"
            {...register('accountNumber', {
              required: 'El número de cuenta es requerido',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'El número de cuenta debe tener 10 dígitos'
              }
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
          <label htmlFor="amount" className="withdrawal__label">Monto a Retirar</label>
          <input
            id="amount"
            type="number"
            step="1"
            className="withdrawal__input"
            {...register('amount', {
              required: 'El monto es requerido',
              min: {
                value: 1,
                message: 'El monto debe ser mayor a 0'
              }
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

        <button type="submit" className="withdrawal__submit">Retirar</button>
      </form>
    </section>
  );
};
