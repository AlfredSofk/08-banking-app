import {renderHook, waitFor} from '@testing-library/react';
import { Mock, vi } from 'vitest';
import React, { act, useReducer } from 'react';
import { initialState, reducer } from '../../../../src/app/core/state/appContext/reducer';
import { AppContext } from '../../../../src/app/core/state/appContext/AppContext';
import { useApp } from '../../../../src/app/core/hooks/useApp';
import { tokenTest } from '../../../../src/app/core/utils/token';
import { getCookie } from '../../../../src/app/core/utils/cookies';
import { IAppState } from '../../../../src/app/core/interfaces/bankAccount';


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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContextMock({ stateMock, dispatch }: { stateMock: any, dispatch?: any }) {


    return ({ children }: { children: React.ReactNode }) => (

        <AppContext.Provider value={{ state: stateMock, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContextWithReducerMock({ stateMock }: { stateMock: IAppState}){

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
    const mockGetCookie = getCookie as Mock

    beforeEach(async () => {
        vi.clearAllMocks();
        // Mock de getCookie que devuelve un token específico
        mockGetCookie.mockImplementation((name: string) => {
            if (name === 'token') {
                return tokenTest;
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
        })

        await waitFor(async () => {

            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")

        },{timeout: 10000})
        

    })


    
}); 


