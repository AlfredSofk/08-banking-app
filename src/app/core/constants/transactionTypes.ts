export enum TransactionTypes {
    WITHDRAW = 'retiroATM',
    DEPOSIT = 'depositoATM',
    DEPOSIT_ACCOUNT = 'deposit-account',
    TRANSFER = 'transfer',
    PURCHASE_WEB = 'purchase-web',
    PURCHASE_STORE = 'purchase-store',
}

export const TransactionTypesTitle = {
    'retiroATM' : "Retirar Cajero",
    'depositoATM' : 'Depositar Cajero',
    'deposit-account' : 'Depósito Agencia',
    'transfer' : 'Transferencia',
    'purchase-web' : 'Compra Web',
    'purchase-store' : 'Compra Establecimiento'
}

export enum TransactionTargets {
    RETIRO = 'retirar',
    DEPOSITO = 'depositar',
    TRANSFERENCIA = 'transferir',
    COMPRA = 'compra'
}

export enum TransactionNames {
    WITHDRAWATM = 'retitarCajero',
    DEPOSITATM = 'depositarCajero',
    DEPOSITACCOUNT = 'deposit',
    DEPOSITTRANSFER = 'depositTrasfer',
    PURCHASEWEB = 'comprarWeb',
    PURCHASELOCAL = 'comprarEstablecimiento'
}