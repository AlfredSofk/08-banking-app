import { environment } from "../../environment/environment";

export const urlResources = {
    generateToken: `${environment.apiBaseUrl}/utils/generate`,
    getClientData : `${environment.apiBaseUrl}/client/findByUserName`,
    getTransaction: (transactionType: string) => `${environment}/transactions/${transactionType}`,
    
};