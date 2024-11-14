import { useLoginToken } from '../../../core/hooks/useLoginToken';
import { USER_LOGIN } from '../../../core/constants/user';
import { useContext } from 'react';
import { AuthContext } from '../../../core/state/authContext/AuthContext';

export default function Login() {

    const { state } = useContext(AuthContext)

    console.log({ ...USER_LOGIN })
    console.log({ state })

    useLoginToken({
        ...USER_LOGIN
    })

    return (
        <>
            <h1>Login</h1>
            {state.loading && <h3>Cargando</h3>}

        </>
    )

}