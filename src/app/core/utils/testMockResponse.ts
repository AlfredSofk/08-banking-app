import { headers } from "../constants/headers";
import { TransactionNames } from "../constants/transactionTypes";
import { IResDataTransaction } from "../interfaces/requestApiTo";
import { IFormBodyTransaction, IRequestBodyTransaction } from "../interfaces/requestToApi";

export const getTestMockResponse =  {  

    [TransactionNames.WITHDRAWATM] : (amount : number) : IResDataTransaction => ({
        "dinHeader": {
            "dispositivo": "PC",
            "idioma": "es",
            "uuid": "02e3eb27-6fb1-e542-e157-c301cc77ad2c",
            "ip": "localhost",
            "horaTransaccion": "string",
            "llaveSimetrica": "xaqVyedHolrJB9vW4lIj5u9nuWIiaPpAQoOK4hm2j+Q=",
            "vectorInicializacion": "Gz3MLPvKU1T5Pc3FfmNYPe9nuWIiaPpAQoOK4hm2j+Q="
        },
        "dinBody": {
            "id": "ecc10bb8-96a1-4a78-a855-1d2cd9721b9e",
            "amountTransaction": amount,
            "transactionCost": 1,
            "typeTransaction": "ATM",
            timeStamp: '2024-11-24T17:33:48.934502644'
        },
        "dinError": {
            "tipo": "SUCCESS",
            "fecha": "2024-11-24T17:33:48.351836757",
            "origen": "null",
            "codigo": "0",
            "codigoErrorProveedor": "0000",
            "mensaje": "Operacion exitosa",
            "detalle": "null"
        }
    }),
    [TransactionNames.DEPOSITATM] : (amount : number) : IResDataTransaction => ({
        "dinHeader": {
            "dispositivo": "PC",
            "idioma": "es",
            "uuid": "02e3eb27-6fb1-e542-e157-c301cc77ad2c",
            "ip": "localhost",
            "horaTransaccion": "string",
            "llaveSimetrica": "xaqVyedHolrJB9vW4lIj5u9nuWIiaPpAQoOK4hm2j+Q=",
            "vectorInicializacion": "Gz3MLPvKU1T5Pc3FfmNYPe9nuWIiaPpAQoOK4hm2j+Q="
        },
        "dinBody": {
            "id": "80cfa246-4e59-473a-a74f-c2155de850fb",
            "amountTransaction": amount,
            "transactionCost": 0,
            "typeTransaction": "Deposito Cajero",
            "timeStamp": "2024-11-24T17:34:23.769570544"
        },
        "dinError": {
            "tipo": "SUCCESS",
            "fecha": "2024-11-24T17:34:23.239358564",
            "origen": null,
            "codigo": "0",
            "codigoErrorProveedor": "0000",
            "mensaje": "Operacion exitosa",
            "detalle": null
        }
    }),
    
    [TransactionNames.DEPOSITACCOUNT] : (amount : number) : IResDataTransaction => ({
        "dinHeader": {
            "dispositivo": "PC",
            "idioma": "es",
            "uuid": "02e3eb27-6fb1-e542-e157-c301cc77ad2c",
            "ip": "localhost",
            "horaTransaccion": "string",
            "llaveSimetrica": "xaqVyedHolrJB9vW4lIj5u9nuWIiaPpAQoOK4hm2j+Q=",
            "vectorInicializacion": "Gz3MLPvKU1T5Pc3FfmNYPe9nuWIiaPpAQoOK4hm2j+Q="
        },
        "dinBody": {
            "id": "90d142de-367e-47c6-8b31-eaf9f9610493",
            "amountTransaction": amount,
            "transactionCost": 0,
            "typeTransaction": "Deposito Sucursal",
            "timeStamp": "2024-11-24T17:35:44.083829564"
        },
        "dinError": {
            "tipo": "SUCCESS",
            "fecha": "2024-11-24T17:35:43.552867890",
            "origen": null,
            "codigo": "0",
            "codigoErrorProveedor": "0000",
            "mensaje": "Operacion exitosa",
            "detalle": null
        }
    }),
        
    [TransactionNames.DEPOSITTRANSFER] : (amount : number) : IResDataTransaction => ({
        "dinHeader": {
            "dispositivo": "PC",
            "idioma": "es",
            "uuid": "02e3eb27-6fb1-e542-e157-c301cc77ad2c",
            "ip": "localhost",
            "horaTransaccion": "string",
            "llaveSimetrica": "xaqVyedHolrJB9vW4lIj5u9nuWIiaPpAQoOK4hm2j+Q=",
            "vectorInicializacion": "Gz3MLPvKU1T5Pc3FfmNYPe9nuWIiaPpAQoOK4hm2j+Q="
        },
        "dinBody": {
            "id": "c2120ffe-9913-4504-b435-2834dece5649",
            "amountTransaction": amount,
            "transactionCost": 1.5,
            "typeTransaction": "Transferencia",
            "timeStamp": "2024-11-24T17:36:28.72702344"
        },
        "dinError": {
            "tipo": "SUCCESS",
            "fecha": "2024-11-24T17:36:27.987258983",
            "origen": null,
            "codigo": "0",
            "codigoErrorProveedor": "0000",
            "mensaje": "Operacion exitosa",
            "detalle": null
        }
    }),

    [TransactionNames.PURCHASEWEB] : (amount : number) : IResDataTransaction => ({
        "dinHeader": {
            "dispositivo": "PC",
            "idioma": "es",
            "uuid": "02e3eb27-6fb1-e542-e157-c301cc77ad2c",
            "ip": "localhost",
            "horaTransaccion": "string",
            "llaveSimetrica": "xaqVyedHolrJB9vW4lIj5u9nuWIiaPpAQoOK4hm2j+Q=",
            "vectorInicializacion": "Gz3MLPvKU1T5Pc3FfmNYPe9nuWIiaPpAQoOK4hm2j+Q="
        },
        "dinBody": {
            "id": "fb8c5264-6537-4445-a661-393fde002ac5",
            "amountTransaction": amount,
            "transactionCost": 0,
            "typeTransaction": "Compra",
            "timeStamp": "2024-11-24T17:37:09.082784109"
        },
        "dinError": {
            "tipo": "SUCCESS",
            "fecha": "2024-11-24T17:37:08.552503546",
            "origen": null,
            "codigo": "0",
            "codigoErrorProveedor": "0000",
            "mensaje": "Operacion exitosa",
            "detalle": null
        }
    }),
    [TransactionNames.PURCHASELOCAL] : (amount : number) : IResDataTransaction => ({
        "dinHeader": {
            "dispositivo": "PC",
            "idioma": "es",
            "uuid": "02e3eb27-6fb1-e542-e157-c301cc77ad2c",
            "ip": "localhost",
            "horaTransaccion": "string",
            "llaveSimetrica": "xaqVyedHolrJB9vW4lIj5u9nuWIiaPpAQoOK4hm2j+Q=",
            "vectorInicializacion": "Gz3MLPvKU1T5Pc3FfmNYPe9nuWIiaPpAQoOK4hm2j+Q="
        },
        "dinBody": {
            "id": "c2120ffe-9913-4504-b435-2834dece5649",
            "amountTransaction": amount,
            "transactionCost": 0,
            "typeTransaction": "Compra",
            "timeStamp": "2024-11-24T17:37:09.082784109"
        },
        "dinError": {
            "tipo": "SUCCESS",
            "fecha": "2024-11-24T17:37:08.552503546",
            "origen": null,
            "codigo": "0",
            "codigoErrorProveedor": "0000",
            "mensaje": "Operacion exitosa",
            "detalle": null
        }
    }),


}


export const getTestMockBody = {
    [TransactionNames.WITHDRAWATM] : (mockAccountNumber : string, amount : number)  => ({
        dinHeader: { ...headers },
        dinBody: {
            accountNumber: mockAccountNumber,
            amount
        }
    }),
    [TransactionNames.DEPOSITATM] : (mockAccountNumber : string, amount : number) : IRequestBodyTransaction => ({
        dinHeader: { ...headers },
        dinBody: {
            accountNumberClient: mockAccountNumber,
            amount
        }
    }),
    [TransactionNames.DEPOSITACCOUNT] : (mockAccountNumber : string, amount : number) => ({
        dinHeader: { ...headers },
        dinBody: {
            accountNumberClient: mockAccountNumber,
            amount
        }
    }),
    [TransactionNames.DEPOSITTRANSFER] : (mockAccountNumber : string, mockAccountReciver : string, amount : number) : IRequestBodyTransaction => ({
        dinHeader: { ...headers },
        dinBody: {
            accountNumberSender: mockAccountNumber,
            accountNumberReceiver: mockAccountReciver,
            amount
        }
    }),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    [TransactionNames.PURCHASEWEB] : (mockAccountNumber : string, amount : number) : IRequestBodyTransaction => ({
        dinHeader: { ...headers },
        dinBody: {
            accountNumberClient: mockAccountNumber,
            amount,
            typeBuys: 0
        }
    }),
    [TransactionNames.PURCHASELOCAL] : (mockAccountNumber : string, amount : number) : IRequestBodyTransaction => ({
        dinHeader: { ...headers },
        dinBody: {
            accountNumberClient: mockAccountNumber,
            amount,
            typeBuys: 0
        }
    }),
}