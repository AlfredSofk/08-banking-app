import { useEffect } from "react";
import { IBodyLoginToken } from "../interfaces/requestToApi";
import { getLoginToken } from "../services/loginToken";

export const useLoginToken = (data: IBodyLoginToken) => {

    useEffect(() => {
        const response = getLoginToken(data)
    }, [])
}

