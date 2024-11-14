import { environment } from "../../environment/environment";

export const urlResources = {
    generateToken: `${environment.apiBaseUrl}/utils/generate`,
    getTransaction: (transactionType: string) => `${environment}/transactions/${transactionType}`,
};