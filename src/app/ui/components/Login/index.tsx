// import { useLoginToken } from '../../../core/hooks/useLoginToken';
// import { USER_LOGIN } from '../../../core/constants/user';
// import { useContext } from 'react';
// import { AuthContext } from '../../../core/state/authContext/AuthContext';
import './style.scss';
import { IAuthState } from '../../../core/interfaces/auth';
import { IBodyLoginToken } from '../../../core/interfaces/requestToApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginToken } from '../../../core/interfaces/requestApiTo';
import { Loader } from '../Loader';


interface Props {
    loginUser:  (data: IBodyLoginToken) => void
    state: IAuthState
}

interface IFormInput {
    usuario: string
    password: string
}

export default function LoginForm({state,loginUser}: Props) {

    const { register, watch,handleSubmit, formState : {errors}} = useForm<IFormInput>({
        defaultValues : {
            usuario : '',
            password : ''
        }
    }) 

    const onSubmit : SubmitHandler<IFormInput> = (data) => {

        let dataForm : IBodyLoginToken = {
            username : data.usuario,
            password : data.password
        }
        console.log(data)
        loginUser(dataForm)

    }
    return (
        <>
            <div className="login">
                <section className='login__container' aria-labelledby="login-heading">
                    <h1 id="login-heading" className='login__title'>Iniciar Sesión</h1>
                    
                    <form className='login-form' aria-describedby="login-form-desc" onSubmit={handleSubmit(onSubmit)}>
                        <p id="login-form-desc" className='login-form__desc'>
                            Introduce tus credenciales para acceder a tu cuenta.
                        </p>
                        <div className='login-form__group'>
                            <label htmlFor="usuario" className='login-form__label'>Usuario</label>
                            <input 
                            type="usuario" 
                            id="usuario" 
                            className='login-form__input' 
                            placeholder="usuarioEjemplo" 
                            aria-required="true"
                            aria-describedby="usuario-desc"
                            aria-invalid={errors.usuario ? "true" : "false"}
                            {...register("usuario", { required: true, pattern: /^[a-zA-Z0-9]+$/i})}
                            />
                            {errors.usuario && (<small className='login-form__error' role="alert">El campo usuario es requerido</small>)}
                            <span id="usuario-desc" className="sr-only">Introduce un correo válido</span>
                        </div>

                        <div className='login-form__group'>
                            <label htmlFor="password" className='login-form__label'>Contraseña</label>
                            <input 
                            type="password" 
                            id="password" 
                            className='login-form__input' 
                            placeholder="••••••••" 
                            aria-required="true"
                            aria-describedby="password-desc"
                            aria-invalid={errors.password ? "true" : "false"}
                            {...register("password", { required: true, minLength: 8 })}                        
                            />
                            {errors.password && <small className='login-form__error' role="alert">El campo password es requerido</small>}
                            <span id="password-desc" className="sr-only">Introduce tu contraseña</span>
                        </div>
                        {
                        state.loading 
                            ?<Loader/>
                            :<button type='submit'  className='login-form__button' >Iniciar Sesión</button>
                        }
                        
                    </form>

                    <p className='login__register'>
                    ¿No tienes una cuenta? 
                    {/* <button type="button" className='login__register-link' aria-label="Registrarse">Regístrate aquí</button> */}
                    </p>
                </section>
            </div>

        </>
    )

}