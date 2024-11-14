import { useContext, useEffect } from "react";
import { IBodyLoginToken } from "../interfaces/requestToApi";
import { getLoginToken } from "../services/loginToken";
import { errorLogin, loading, login } from "../state/login/action";
import { AuthContext } from "../state/authContext/AuthContext";
import { ILoginToken } from "../interfaces/requestApiTo";

export const useLoginToken = (data: IBodyLoginToken) => {

  const { state, dispatch } = useContext(AuthContext)


  useEffect(() => {
    dispatch(loading(state))
    getLoginToken(data).then((response) => {

      if ("message" in response) {
        dispatch(errorLogin(response.message))
      }

      dispatch(login(response as ILoginToken))
    });

  }, [])
}

