import { IError } from "../interfaces/error";
import { IJWT } from "../interfaces/jwt";

export function parseJwt (token : string | undefined) : IJWT | IError {

    if(token === undefined) return {message: "Error token vacio"}

    try {
        const base64Payload = token.split('.')[1]; // Obtenemos la segunda parte (payload)
        const payload = atob(base64Payload); // Decodificamos de Base64
        return JSON.parse(payload); // Convertimos el JSON a un objeto
      } catch (error) {
        
        return {message: "Error al decodificar JWT"}
      }
}