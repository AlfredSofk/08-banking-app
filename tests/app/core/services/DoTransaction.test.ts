import { vi } from "vitest";
import { transactionMapper } from '../../../../src/app/core/mappers/apiTo/transaction.mapper';
import { http } from "../../../../src/app/core/services/generals/http";
import { tokenTest } from "../../../../src/app/core/utils/token";
import { getTestMockResponse, getTestMockBody } from '../../../../src/app/core/utils/testMockResponse';
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import { doTransaction } from '../../../../src/app/core/services/doTransaction';
import { TransactionNames } from "../../../../src/app/core/constants/transactionTypes";
import { IResDataTransaction } from "../../../../src/app/core/interfaces/requestApiTo";



vi.mock('../../../../src/app/core/services/generals/http');
vi.mock('../../../../src/app/core/mappers/apiTo/transaction.mapper');
vi.mock('../../../../src/app/core/utils/cookies.ts', () => ({
    getCookie: vi.fn()
}))
vi.mock('../../../../src/app/environment/environment.ts', () => ({
    environment: {
        apiBaseUrl: 'https://zero7-rabbit.onrender.com'
    }
}))




describe('Pruebas para el servicio DoTransaction', () => {        
    const mockHttp = vi.mocked(http);
    const mockMapper = vi.mocked(transactionMapper);
    const mockGetCookie = vi.fn()

    const mockAccountNumber = 'eEUmMZUTw3xEtmhqo45O+A==';
    const mockAccountReciver = '6ig/kf+q1mUw6arpdWqfeA==';

    beforeEach(async () => {
        vi.clearAllMocks();
        const {getCookie} = await import('../../../../src/app/core/utils/cookies');
        const mockGetCookie = getCookie
        mockGetCookie.mockImplementation((name: string) => {
            if (name === 'token') {
                return tokenTest;
            }
            return null;
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const mockUrlRetiroATM = urlResources.getTransaction(TransactionNames.WITHDRAWATM);
    const mockUrlDepositATM = urlResources.getTransaction(TransactionNames.DEPOSITATM);
    const mockUrlDepositAcc = urlResources.getTransaction(TransactionNames.DEPOSITACCOUNT);
    const mockUrlTransferencia = urlResources.getTransaction(TransactionNames.DEPOSITTRANSFER);
    const mockUrlCompraWeb = urlResources.getTransaction(TransactionNames.PURCHASEWEB);
    const mockUrlCompraEstablecimiento = urlResources.getTransaction(TransactionNames.PURCHASELOCAL);

    test('llama a http con los parámetros correctos para un retiro ATM', async() => { 

        const amount = 1000;

        const mockResponse = getTestMockResponse[TransactionNames.WITHDRAWATM](amount);

        const mockBody = getTestMockBody[TransactionNames.WITHDRAWATM](mockAccountNumber, amount);

        mockHttp.mockResolvedValue(mockResponse);
        mockGetCookie.mockReturnValue(tokenTest);
        mockMapper.mockReturnValue(mockResponse);

        const result = await doTransaction(TransactionNames.WITHDRAWATM, { accountNumber : mockAccountNumber, amount });

        expect(mockHttp).toHaveBeenCalledWith(mockUrlRetiroATM, 'POST', mockBody, tokenTest);
        expect(mockMapper).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mockResponse);

    });

    test('maneja correctamente una transacción de depósito ATM', async () => {

        const amount = 1000;

        const mockResponse = getTestMockResponse[TransactionNames.DEPOSITATM](amount);

        const mockBody = getTestMockBody[TransactionNames.DEPOSITATM](mockAccountNumber, amount);

        mockHttp.mockResolvedValue(mockResponse);
        mockGetCookie.mockReturnValue(tokenTest);
        mockMapper.mockReturnValue(mockResponse);

        const result = await doTransaction(TransactionNames.DEPOSITATM, { accountNumber : mockAccountNumber, amount });

        expect(mockHttp).toHaveBeenCalledWith(mockUrlDepositATM, 'POST', mockBody, tokenTest);
        expect(mockMapper).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mockResponse);

    });
    
    test('maneja correctamente una transacción de depósito de cuenta', async () => {

        const amount = 1000;

        const mockResponse = getTestMockResponse[TransactionNames.DEPOSITACCOUNT](amount);

        const mockBody = getTestMockBody[TransactionNames.DEPOSITACCOUNT](mockAccountNumber, amount);

        mockHttp.mockResolvedValue(mockResponse);
        mockGetCookie.mockReturnValue(tokenTest);
        mockMapper.mockReturnValue(mockResponse);

        const result = await doTransaction(TransactionNames.DEPOSITACCOUNT, {accountNumber : mockAccountNumber, amount });

        expect(mockHttp).toHaveBeenCalledWith(mockUrlDepositAcc, 'POST', mockBody, tokenTest);
        expect(mockMapper).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mockResponse);

    });

    test('maneja correctamente una transacción de transferencia', async () => {

        const amount = 1000;

        const mockResponse = getTestMockResponse[TransactionNames.DEPOSITTRANSFER](amount);

        const mockBody = getTestMockBody[TransactionNames.DEPOSITTRANSFER](mockAccountNumber, mockAccountReciver, amount);

        mockHttp.mockResolvedValue(mockResponse);
        mockGetCookie.mockReturnValue(tokenTest);
        mockMapper.mockReturnValue(mockResponse);

        const result = await doTransaction(TransactionNames.DEPOSITTRANSFER, { accountNumber : mockAccountNumber, accountNumberReceiver : mockAccountReciver, amount });

        expect(mockHttp).toHaveBeenCalledWith(mockUrlTransferencia, 'POST', mockBody, tokenTest);
        expect(mockMapper).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mockResponse);

    });

    test('maneja correctamente una transacción de compra web', async () => {

        const amount = 1000;

        const mockResponse = getTestMockResponse[TransactionNames.PURCHASEWEB](amount);

        const mockBody = getTestMockBody[TransactionNames.PURCHASEWEB](mockAccountNumber, amount);

        mockHttp.mockResolvedValue(mockResponse);
        mockGetCookie.mockReturnValue(tokenTest);
        mockMapper.mockReturnValue(mockResponse);

        const result = await doTransaction(TransactionNames.PURCHASEWEB, { accountNumber : mockAccountNumber, amount });

        expect(mockHttp).toHaveBeenCalledWith(mockUrlCompraWeb, 'POST', mockBody, tokenTest);
        expect(mockMapper).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mockResponse);

    });

    test('maneja correctamente una transacción de compra de establecimiento', async () => {

        const amount = 1000;

        const mockResponse = getTestMockResponse[TransactionNames.PURCHASELOCAL](amount);

        const mockBody = getTestMockBody[TransactionNames.PURCHASELOCAL](mockAccountNumber, amount);

        mockHttp.mockResolvedValue(mockResponse);
        mockGetCookie.mockReturnValue(tokenTest);
        mockMapper.mockReturnValue(mockResponse);

        const result = await doTransaction(TransactionNames.PURCHASELOCAL, { accountNumber : mockAccountNumber, amount });

        expect(mockHttp).toHaveBeenCalledWith(mockUrlCompraEstablecimiento, 'POST', mockBody, tokenTest);
        expect(mockMapper).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mockResponse);

    });

    test('maneja correctamente un error de red', async () => {
        mockHttp.mockRejectedValue(new Error('Network Error'));

        const result = await doTransaction('WITHDRAWATM', {
            accountNumber: '123456',
            amount: 1000,
        });

        expect(result).toEqual({ message: 'Network Error' });
    });

});                                              