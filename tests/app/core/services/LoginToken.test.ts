import { vi } from "vitest";
import { getLoginToken } from "../../../../src/app/core/services/loginToken";
import { http } from "../../../../src/app/core/services/generals/http";
import { loginTokenMapper } from "../../../../src/app/core/mappers/apiTo/loginToken.mapper";
import { IDinBodyLoginToken } from "../../../../src/app/core/interfaces/requestToApi";
import { headers } from "../../../../src/app/core/constants/headers";
import { urlResources } from "../../../../src/app/core/constants/urlResources";

vi.mock('../../../../src/app/core/services/generals/http');
vi.mock('../../../../src/app/core/mappers/apiTo/loginToken.mapper');

vi.mock('../../../../src/app/environment/environment.ts', () => ({
    environment: {
        apiBaseUrl: 'https://zero7-rabbit.onrender.com'
    }
}))

describe('Pruebas para el servicio LoginToken', () => {

    const mockHttp = vi.mocked(http);
    const mockMapper = vi.mocked(loginTokenMapper);

    const mockHeaders = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mockToken',
    };

    const mockResponse = {
        dinHeader: {},
        dinBody: { token: 'mockToken' },
        dinError: null,
    };

    afterEach(() => {
        vi.clearAllMocks();
    });


    test('llama a http con los parámetros correctos y devuelve el token mapeado', async() => {        

        const mockBody: IDinBodyLoginToken = {
            dinHeader: { ...headers },
            dinBody: { username : 'pablo', password: '123456' },
        }

        const mockUrl = urlResources.generateToken

        mockHttp.mockResolvedValue(mockResponse);
        mockMapper.mockReturnValue(mockResponse);

        const result = await getLoginToken({ username: 'pablo', password: '123456' });


        // Verificar que http fue llamado con los parámetros correctos
        expect(mockHttp).toHaveBeenCalledWith(mockUrl, 'POST', mockBody);

        expect(mockMapper).toHaveBeenCalledWith(mockResponse);

        // Verificar que el resultado es el esperado
        expect(result).toEqual(mockResponse);
    })


    test('maneja errores de la API devolviendo un mensaje de error', async () => {
        const mockError = new Error('Network Error');
        mockHttp.mockRejectedValue(mockError);

        const result = await getLoginToken({ username: 'testuser', password: 'password123' });

        // Verificar que el resultado contiene el mensaje de error
        expect(result).toEqual({ message: 'Network Error' });
    });

    test('maneja errores en el mapeo de la respuesta', async () => {
        mockHttp.mockResolvedValue(mockResponse);
        mockMapper.mockImplementation(() => {
            throw new Error('Mapping Error');
        });

        const result = await getLoginToken({ username: 'testuser', password: 'password123' });

        // Verificar que el resultado contiene el mensaje de error
        expect(result).toEqual({ message: 'Mapping Error' });
    });

});