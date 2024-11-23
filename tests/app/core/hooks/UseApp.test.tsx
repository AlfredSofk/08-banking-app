import {renderHook, waitFor} from '@testing-library/react';
import { vi } from 'vitest';
import React, { act, useReducer } from 'react';
import { initialState, reducer } from '../../../../src/app/core/state/appContext/reducer';
import { AppContext } from '../../../../src/app/core/state/appContext/AppContext';
import { useApp } from '../../../../src/app/core/hooks/useApp';


vi.mock('../../../../src/app/core/utils/cookies', () => ({
    getCookie: vi.fn()
}))

vi.mock('../../../../src/app/environment/environment.ts', () => ({
    environment: {
        apiBaseUrl: 'https://zero7-rabbit.onrender.com'
    }
}))


const initialStateMock = { ...initialState }

const wrapperMock = ({ children }: { children: React.ReactNode }) => (

    <AppContext.Provider value={{ state: initialState, dispatch: vi.fn() }}>
        {children}
    </AppContext.Provider>

)

function getContextMock({ stateMock, dispatch }: { stateMock: any, dispatch?: any }) {


    return ({ children }: { children: React.ReactNode }) => (

        <AppContext.Provider value={{ state: stateMock, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

function getContextWithReducerMock({ stateMock }: { stateMock: any}){

    return({children}) => {
        const [state, dispatch] = useReducer(reducer, stateMock);
        return (
            <AppContext.Provider value={{ state, dispatch }}>
                {children}
            </AppContext.Provider>
        )

    }
}


describe('Test para el hook useApp', async() => {

    beforeEach(async () => {
        vi.clearAllMocks();
        // Mock de getCookie que devuelve un token específico
        const {getCookie} = await import('../../../../src/app/core/utils/cookies');
        const mockGetCookie = getCookie
        mockGetCookie.mockImplementation((name: string) => {
            if (name === 'token') {
                return 'eyJpZGVudGlmaWNhdGlvbkRldmljZSI6IkFETUlOIiwiaWRlbnRpZmljYXRpb25OdW1iZXIiOiJwYWJsbyIsImlkZW50aWZpY2F0aW9uVHlwZSI6IkpXVCIsImFsZyI6IkhTNTEyIn0.eyJqdGkiOiJiYW5jb0FQSUpXVCIsInN1YiI6InBhYmxvIiwiYXV0aG9yaXRpZXMiOlsiV1JJVEUiLCJSRUFEIiwiQURNSU4iXSwiaWF0IjoxNzMyMzc2NDY3LCJleHAiOjE3MzI0NTQ0Njd9.YzH90xrPQTi8EoAbmaqaT6wtZTGdKiOQYfpLgH2zNkS8_q-W_yXz62X7XitbxlLyyOmzn3s1uSfGMdzIVdofSA';
            }
            return null;
        });
    });

    test('Verificar que el estado inicial es el correcto', async() => {
        const { result } = renderHook(() => useApp(), { wrapper: wrapperMock })
        expect(result.current.state).toEqual(initialStateMock)
    })

    test('Verificar que el dispacth no se llame si no existe un usuario', async() => {

        const mockDispatch = vi.fn()

        const wrapperMock = getContextMock({ stateMock: initialStateMock, dispatch: mockDispatch  })
        const { result } = renderHook(() => useApp(), { wrapper: wrapperMock })
        
        act(() => {
            result.current.getDataClient("")
        })

        expect(mockDispatch).not.toBeCalled()
    })

    test('Verificar que el getDataClient actualiza el estado correctamente', async() => {


        const wrapperMock = getContextWithReducerMock({ stateMock: initialStateMock })

        const { result } = renderHook(() => useApp(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.getDataClient("pablo")

            // expect(result.current.state.loading).toBe(false)
        })

        await waitFor(async () => {

            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")

        },{timeout: 10000})
        

    })


    
}); 


