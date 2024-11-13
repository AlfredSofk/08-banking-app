import { environment } from "../../environment/environment";

export const urlResources = {
    generateToken: `${environment}/utils/generate`,
    getTransaction: (transactionType : string) => `${environment}/transactions/${transactionType}`,
};