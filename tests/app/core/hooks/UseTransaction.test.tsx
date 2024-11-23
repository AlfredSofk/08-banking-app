import React, { act, useReducer } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { useTransactions } from "../../../../src/app/core/hooks/useTransaction";
import { initialState, reducer } from "../../../../src/app/core/state/appContext/reducer";
import { AppContext } from "../../../../src/app/core/state/appContext/AppContext";
import { vi } from "vitest";
import { IAppState } from "../../../../src/app/core/interfaces/bankAccount";

vi.mock('../../../../src/app/environment/environment.ts', () => ({
    environment: {
        apiBaseUrl: 'https://zero7-rabbit.onrender.com'
    }
}))

vi.mock('../../../../src/app/core/utils/cookies', () => ({
    getCookie: vi.fn()
}))


const initialStateMock = { ...initialState}

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


describe('Test para el hook useTransaction', () => {


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
        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        expect(result.current.state).toEqual(initialStateMock)
    })

    test('Verificar que el dispatch no se llama si no existe un usuario', async() => {        
        const mockDispatch = vi.fn()

        const wrapperMock = getContextMock({ stateMock: initialStateMock, dispatch: mockDispatch  })
        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        
        await act( async() => {
            await result.current.retiroCajeroATM({})
        })        

        expect(mockDispatch).not.toBeCalled()
    })

    test('Verificar que el retiroCajeroATM actualiza el estado correctamente', async() => {

        const testStateMock : IAppState = {
            transacciones: [],
            userAccounts: [      
                {
                number: "eEUmMZUTw3xEtmhqo45O+A==",
                amount: 1000
              },
              {
                number: "6ig/kf+q1mUw6arpdWqfeA==",
                amount: 2000
              }],
            username: 'pablo',
            saldoGlobal: 3000,
            loading: false,
            error: null,
        }

        const wrapperMock = getContextWithReducerMock({ stateMock: testStateMock })

        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.retiroCajeroATM({accountNumber: "6ig/kf+q1mUw6arpdWqfeA==", amount: 10})
        })

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")
            expect(result.current.state.saldoGlobal).toBe(2989)
        },{timeout: 10000})
    })

    test('Verificar que el depositarCajeroATM actualiza el estado correctamente', async() => {

        const testStateMock : IAppState = {
            transacciones: [],
            userAccounts: [      
                {
                number: "eEUmMZUTw3xEtmhqo45O+A==",
                amount: 1000
              },
              {
                number: "6ig/kf+q1mUw6arpdWqfeA==",
                amount: 2000
              }],
            username: 'pablo',
            saldoGlobal: 3000,
            loading: false,
            error: null,
        }

        const transactionCostMock = 1

        const wrapperMock = getContextWithReducerMock({ stateMock: testStateMock })

        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.depositarCajeroATM({accountNumber: "6ig/kf+q1mUw6arpdWqfeA==", amount: 10})
        })      

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")
            expect(result.current.state.saldoGlobal).toBe(3010)
        },{timeout: 10000})
    })

    test('Verificar que el depositarAgencia actualiza el estado correctamente', async() => {

        const testStateMock : IAppState = {
            transacciones: [],
            userAccounts: [      
                {
                number: "eEUmMZUTw3xEtmhqo45O+A==",
                amount: 1000
              },
              {
                number: "6ig/kf+q1mUw6arpdWqfeA==",
                amount: 2000
              }],
            username: 'pablo',
            saldoGlobal: 3000,
            loading: false,
            error: null,
        }

        const transactionCostMock = 0

        const wrapperMock = getContextWithReducerMock({ stateMock: testStateMock })

        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.depositarAgencia({accountNumber: "6ig/kf+q1mUw6arpdWqfeA==", amount: 10})
        })

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")
            expect(result.current.state.saldoGlobal).toBe(3010)
        },{timeout: 10000})
        
    })

    test('Verificar que el transferencias actualiza el estado correctamente', async() => {

        const testStateMock : IAppState = {
            transacciones: [],
            userAccounts: [      
                {
                number: "eEUmMZUTw3xEtmhqo45O+A==",
                amount: 1000
              },
              {
                number: "6ig/kf+q1mUw6arpdWqfeA==",
                amount: 2000
              }],
            username: 'pablo',
            saldoGlobal: 3000,
            loading: false,
            error: null,
        }

        const transactionCostMock = 1.5

        const wrapperMock = getContextWithReducerMock({ stateMock: testStateMock })

        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.transferencias({accountNumber: "6ig/kf+q1mUw6arpdWqfeA==", accountNumberReceiver: "eEUmMZUTw3xEtmhqo45O+A==", amount: 10})
        })

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")
            expect(result.current.state.saldoGlobal).toBe(3000 - transactionCostMock)
        },{timeout: 10000})
    })

    test('Verificar que el compraWeb actualiza el estado correctamente', async() => {

        const testStateMock : IAppState = {
            transacciones: [],
            userAccounts: [      
                {
                number: "eEUmMZUTw3xEtmhqo45O+A==",
                amount: 1000
              },
              {
                number: "6ig/kf+q1mUw6arpdWqfeA==",
                amount: 2000
              }],
            username: 'pablo',
            saldoGlobal: 3000,
            loading: false,
            error: null,
        }
        const transactionCostMock = 0
        const wrapperMock = getContextWithReducerMock({ stateMock: testStateMock })
        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.compraWeb({accountNumber: "6ig/kf+q1mUw6arpdWqfeA==", amount: 10})
        })

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")
            expect(result.current.state.saldoGlobal).toBe(2990)
        },{timeout: 10000})
    })

    test('Verificar que el compraEstablecimiento actualiza el estado correctamente', async() => {

        const testStateMock : IAppState = {
            transacciones: [],
            userAccounts: [      
                {
                number: "eEUmMZUTw3xEtmhqo45O+A==",
                amount: 1000
              },
              {
                number: "6ig/kf+q1mUw6arpdWqfeA==",
                amount: 2000
              }],
            username: 'pablo',
            saldoGlobal: 3000,
            loading: false,
            error: null,
        }
        const transactionCostMock = 0
        const wrapperMock = getContextWithReducerMock({ stateMock: testStateMock })
        const { result } = renderHook(() => useTransactions(), { wrapper: wrapperMock })
        
        await act(async() =>{
            await result.current.compraEstablecimiento({accountNumber: "6ig/kf+q1mUw6arpdWqfeA==", amount: 10})
        })

        await waitFor(async () => {
            expect(result.current.state.loading).toBe(false)
            expect(result.current.state.username).toBe("pablo")
            expect(result.current.state.saldoGlobal).toBe(2990 - transactionCostMock)
        },{timeout: 10000})
    })

});