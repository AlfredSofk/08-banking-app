import { renderHook, waitFor } from "@testing-library/react";
import { initialState,reducer } from "../../../../src/app/core/state/authContext/reducer";
import { useLoginToken } from '../../../../src/app/core/hooks/useLoginToken';
import { AuthContext } from "../../../../src/app/core/state/authContext/AuthContext";
import React, { act, useReducer } from "react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock('../../../../src/app/environment/environment.ts', () => ({
    environment: {
        apiBaseUrl: 'https://zero7-rabbit.onrender.com'
    }
}))

const initialStateMock = { ...initialState }

const wrapperMock = ({ children }: { children: React.ReactNode }) => (

    <MemoryRouter>
        <AuthContext.Provider value={{ state: initialState, dispatch: vi.fn() }}>
            {children}
        </AuthContext.Provider>
    </MemoryRouter>

)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContextMock({ stateMock, dispatch }: { stateMock: any, dispatch?: any }) {


    return ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>    
            <AuthContext.Provider value={{ state: stateMock, dispatch }}>
                {children}
            </AuthContext.Provider>
        </MemoryRouter>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContextWithReducerMock({ stateMock }: { stateMock: any}){

    return({children}) => {
        const [state, dispatch] = useReducer(reducer, stateMock);
        return (
            <MemoryRouter>
                <AuthContext.Provider value={{ state, dispatch }}>
                    {children}
                </AuthContext.Provider>
            </MemoryRouter>
        )

    }
}


describe('Test para el hook useLoginToken', () => {

    test('Verificar que el estado inicial es el correcto', async() => {
        const { result } = renderHook(() => useLoginToken(), { wrapper: wrapperMock })
        expect(result.current.state).toEqual(initialStateMock)
    })

    test('verificar que el dispatch no se llama si no existe un usuario', async() => {        
        const mockDispatch = vi.fn()

        const wrapperMock = getContextMock({ stateMock: initialStateMock, dispatch: mockDispatch  })
        const { result } = renderHook(() => useLoginToken(), { wrapper: wrapperMock })
        
        act(() => {
            result.current.loginUser({username: "", password: ""})      
        })        

        expect(mockDispatch).not.toBeCalled()
    })

    test('Verificar que el loginUser actualiza el estado correctamente', async() => {

        const wrapperMock = getContextWithReducerMock({ stateMock: initialStateMock })

        const { result } = renderHook(() => useLoginToken(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.loginUser({username: "pablo", password: "12qwaszx"})
        })

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.user).toBe("pablo")

        },{timeout: 10000})
    })

    test('Verificar que el logoutUser actualiza el estado correctamente', async() => {

        const wrapperMock = getContextWithReducerMock({ stateMock: initialStateMock })
        const { result } = renderHook(() => useLoginToken(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.logoutUser()
        })

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.user).toBe(null)

        })
    })

});