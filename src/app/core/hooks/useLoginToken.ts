import { useContext } from "react";
import { IBodyLoginToken } from "../interfaces/requestToApi";
import { getLoginToken } from "../services/loginToken";
import { errorLogin, loading, login, logout } from '../state/login/action';
import { AuthContext } from "../state/authContext/AuthContext";
import { ILoginToken } from "../interfaces/requestApiTo";


import { setCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";



export const useLoginToken = () => {

  const { state, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const loginUser = (data: IBodyLoginToken) => {

    if(data.username !== "" && data.password !== ""){
      dispatch(loading(state))
      getLoginToken(data).then((response) => {
  
        if ("message" in response) {
          dispatch(errorLogin(response.message))
        }
  
        sessionStorage.setItem('token', response.dinBody?.token)
        setCookie('token', response.dinBody?.token)
        setCookie('username', data.username)
        dispatch(login(response as ILoginToken))
        navigate('/home/inicio')
      });
    }

  }

  const logoutUser = () => {
    dispatch(logout())
    sessionStorage.removeItem('token')
    setCookie('token', '')
    setCookie('username', '')
    navigate('/')
  }

  return { state, loginUser, logoutUser }
}

