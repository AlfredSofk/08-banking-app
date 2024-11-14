

import cookies from "js-cookie";

export const getCookie = (name: string) => {
    return cookies.get(name)
}

export const setCookie = (name: string, value: string) => {
    return cookies.set(name, value)
}