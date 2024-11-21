import { render, screen } from '@testing-library/react';
import {Loader} from '../../../../src/app/ui/components/Loader';
import React, { createContext } from 'react';
const initialState = {
    isLoading: false,
}

const AppContext = createContext({ state: {} as typeof initialState, dispatch: () => null });


const wrapperMock = ({ children}: { children: React.ReactNode}) => (

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

describe('Test Para componente Loader', () => {
 
    test('Match snapshot', () => {
        const { asFragment } = render( <Loader />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Verificar si el Loader se renderiza', () => {
        const { getByTestId } = render( <Loader />);
        expect(getByTestId('loader')).toBeInTheDocument();
    });

    test('Verificar si el Loader se renderiza condiconalmente', () => {
        const stateMock = {
            isLoading: false,
        }
        const wrapper = ({children}) => (
            <React.Fragment>
                {stateMock.isLoading && <Loader />}
            </React.Fragment>

        )
            // Verifica si el Loader se muestra cuando isLoading es true
        if (initialState.isLoading) {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        } else {
            expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
        }
    });

});