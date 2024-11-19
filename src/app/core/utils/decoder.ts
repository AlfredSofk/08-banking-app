import CryptoJS from "crypto-js";
import { headers } from "../constants/headers";

const VITE_SYMMETRIC_KEY = headers.llaveSimetrica;
const INITIALIZATION_VECTOR = headers.vectorInicializacion;

export const encryptAES = (text: string) => {
    const ciphertext = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(VITE_SYMMETRIC_KEY),
        {
            iv: CryptoJS.enc.Utf8.parse(INITIALIZATION_VECTOR),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    return ciphertext.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decryptAES = (encryptedText: string) => {
    const bytes = CryptoJS.AES.decrypt(
        encryptedText,
        CryptoJS.enc.Utf8.parse(VITE_SYMMETRIC_KEY),
        {
            iv: CryptoJS.enc.Utf8.parse(INITIALIZATION_VECTOR),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    return bytes.toString(CryptoJS.enc.Utf8);
};