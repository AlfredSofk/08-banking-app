import { IBankTransactionWithDrawFromATM } from "./transaction";

interface IDinBodyGetDataClient {
    username: string;
}

export interface IDinHeader {
    dispositivo: string;
    idioma: string;
    uuid: string;
    ip: string;
    horaTransaccion: string;
    llaveSimetrica: string;
    vectorInicializacion: string;
}


export interface IDinError {
    tipo: string;
    fecha: string;
    origen: string;
    codigo: string;
    codigoErrorProveedor: string;
    mensaje: string;
    detalle: string;
}

export interface IBodyLoginToken {
    username: string;
    password: string;
}

export interface IDinBodyLoginToken {
    dinHeader: IDinHeader;
    dinBody: IBodyLoginToken;
}

export interface IRequestMs {
    dinHeader: IDinHeader;
    dinError: IDinError;
}

export interface ITransactionWithDrawFromATM {
    dinHeader : IDinHeader
    dinBody : IBankTransactionWithDrawFromATM

}

export interface IRequestBodyGetDataClient {
    dinHeader: IDinHeader;
    dinBody : IDinBodyGetDataClient
}