import { vi } from "vitest";
import { headers } from "../../../../src/app/core/constants/headers";
import { IRequestBodyGetDataClient } from "../../../../src/app/core/interfaces/requestToApi";
import { http } from "../../../../src/app/core/services/generals/http";
import { getDataUserMapper } from "../../../../src/app/core/mappers/apiTo/getDataUser.mapper";
import { tokenTest } from "../../../../src/app/core/utils/token";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import { IResGetDataClient } from "../../../../src/app/core/interfaces/requestApiTo";
import { getClientData } from "../../../../src/app/core/services/getDataClient";



vi.mock('../../../../src/app/core/services/generals/http');
vi.mock('../../../../src/app/core/mappers/apiTo/getDataUser.mapper');

vi.mock('../../../../src/app/core/utils/cookies.ts', () => ({
    getCookie: vi.fn()
}))

vi.mock('../../../../src/app/environment/environment.ts', () => ({
    environment: {
        apiBaseUrl: 'https://zero7-rabbit.onrender.com'
    }
}))

const mockResponse : IResGetDataClient = {
    dinHeader: {...headers},
    dinBody: {     username: "pablo",
        rol: "ADMIN",
        accounts: [
          {
            number: "eEUmMZUTw3xEtmhqo45O+A==",
            amount: 2550.0
          },
          {
            number: "6ig/kf+q1mUw6arpdWqfeA==",
            amount: 631.25
          }
        ] },
    dinError : {    
        tipo: "SUCCESS",
        fecha: "2024-11-24T15:36:46.247377442",
        origen: "null",
        codigo: "0",
        codigoErrorProveedor: "0000",
        mensaje: "Operacion exitosa",
        detalle: "null"
    },
};

describe('Pruebas para el servicio GetDataClient', () => {

    const mockHttp = vi.mocked(http);
    const mockMapper = vi.mocked(getDataUserMapper);
    const mockGetCookie = vi.fn()

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



    test('llama a http con los parámetros correctos y devuelve datos mapeados', async() => {        
        const mockBody: IRequestBodyGetDataClient = {
            
            dinHeader: { ...headers },
            dinBody: { username : 'pablo' },
        }

        const mockUrl = urlResources.getClientData
        const mockToken = tokenTest

        mockHttp.mockResolvedValue(mockResponse);
        mockMapper.mockReturnValue(mockResponse);

        const result = await getClientData({ username: 'pablo' });

        expect(mockHttp).toHaveBeenCalledWith(mockUrl, 'POST', mockBody, mockToken );
        expect(mockMapper).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mockResponse);
    })

    test('devuelve un mensaje de error cuando la API falla', async () => {
        mockHttp.mockRejectedValue(new Error('Network Error'));
        // mockGetCookie.mockReturnValue('mock-token');

        const result = await getClientData({ username: 'pablo' });

        expect(result).toEqual({ message: 'Network Error' });
    });

    test('llama a http sin token cuando getCookie devuelve null', async () => {
        const mockBody: IRequestBodyGetDataClient = {
            
            dinHeader: { ...headers },
            dinBody: { username : 'pablo' },
        }

        const mockUrl = urlResources.getClientData

        mockHttp.mockRejectedValue(new Error('Network Error'));
        mockMapper.mockReturnValue(mockResponse);

        const result = await getClientData({ username: 'pablo' });

        expect(mockHttp).toHaveBeenCalledWith(mockUrl, 'POST', mockBody, tokenTest );
        expect(result).toEqual({ message: 'Network Error' });
    });

    test('devuelve un mensaje de error cuando el mapeo falla', async () => {
        mockHttp.mockResolvedValue(mockResponse);
        mockGetCookie.mockReturnValue('mock-token');
        mockMapper.mockImplementation(() => {
            throw new Error('Mapping Error');
        });

        const result = await getClientData({ username: 'pablo' });

        expect(result).toEqual({ message: 'Mapping Error' });
    });

    test('llama a http con encabezados correctos cuando getCookie devuelve un token', async () => {

        const mockBody: IRequestBodyGetDataClient = {
            dinHeader: { ...headers },
            dinBody: { username: 'pablo' },
        };

        const mockUrl = urlResources.getClientData;

        mockHttp.mockResolvedValue(mockResponse);
        mockMapper.mockReturnValue(mockResponse);

        await getClientData({ username: 'pablo' });

        expect(mockHttp).toHaveBeenCalledWith(
            mockUrl,
            'POST',
            mockBody,
            tokenTest
        );
    });

});