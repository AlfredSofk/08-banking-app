
export const bankAccountActionTypes = {

    DEPOSIT : 'DEPOSIT',
    WITHDRAW : 'WITHDRAW',
    TRANSFER : 'TRANSFER',
    PURCHASE : 'PURCHASE',
}


export const deposit = () => ({
    type: bankAccountActionTypes.DEPOSIT,
});

export const withdraw = () => ({
    type: bankAccountActionTypes.WITHDRAW,
});

export const transfer = () => ({
    type: bankAccountActionTypes.TRANSFER,
});

export const purchase = () => ({
    type: bankAccountActionTypes.PURCHASE,
});
