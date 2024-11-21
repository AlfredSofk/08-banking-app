import { fireEvent, render, screen, waitFor,  } from "@testing-library/react";

import { TopBar } from "../../../../src/app/ui/components/TopBar";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import {vi} from "vitest";
import { useLoginToken } from "../../../../src/app/core/hooks/useLoginToken";

vi.mock("../../../../src/app/core/hooks/useLoginToken", () => ({
    useLoginToken: vi.fn(() => ({
        state: {},
        loginUser: vi.fn(),
        logoutUser: vi.fn(),
    })),
}));


describe('test para el componente TopBar', () => {

    test('match snapshot', () => {
        const { asFragment } = render( 
            <MemoryRouter><TopBar /></MemoryRouter>
    );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renderiza correctamente el componente TopBar', () => {
        render(<MemoryRouter><TopBar /></MemoryRouter>);
        expect(screen.getByRole('banner', { name: /barra superior/i })).toBeInTheDocument();
        expect(screen.getByText(/panel bancario/i)).toBeInTheDocument();
        expect(screen.getByAltText(/icono de usuario/i)).toBeInTheDocument();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument(); // Dropdown no visible
    });

    test('abre y cierra el menú desplegable al hacer clic en el usuario', async () => {
        render(<MemoryRouter><TopBar /></MemoryRouter>);
    
        // Verificar que el menú no está visible inicialmente
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
        // Simular clic para abrir el menú
        const userButton = screen.getByText(/usuario/i);
        
        await fireEvent.click(userButton);
        expect(screen.getByRole('menu')).toBeInTheDocument();
    
        // Simular clic nuevamente para cerrar el menú
        await fireEvent.click(userButton);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });


    
    test('llama a logoutUser al hacer clic en el botón de Logout', async () => {
        
        render(<MemoryRouter><TopBar /></MemoryRouter>);

        // Abrir el menú
        const userButton = screen.getByText(/usuario/i);
        fireEvent.click(screen.getByText(/usuario/i));

        // Verificar que el botón de Logout está presente
        const logoutButton = screen.getByRole('menuitem', { name: /logout/i }) as HTMLButtonElement;
        expect(logoutButton).toBeInTheDocument();

        // // Hacer clic en el botón de Logout
        await fireEvent.click(logoutButton);

        console.log(logoutButton)

        expect(useLoginToken().logoutUser).toHaveBeenCalled();

        
    });

});