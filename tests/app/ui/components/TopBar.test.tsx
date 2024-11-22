import { fireEvent, render, screen, waitFor,  } from "@testing-library/react";

import { TopBar } from "../../../../src/app/ui/components/TopBar";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import {vi} from "vitest";
// import { useLoginToken } from "../../../../src/app/core/hooks/useLoginToken";

vi.mock("../../../../src/app/core/hooks/useLoginToken", () => ({
    useLoginToken: vi.fn(() => ({
        state: {},
        loginUser: vi.fn(),
        logoutUser: vi.fn(),
    })),
}));

// vi.mock("../../../../src/app/core/hooks/useLoginToken"  , () => ({

//     useLoginToken : vi.fn(),

// }));

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
        
        const {useLoginToken} = await import ('../../../../src/app/core/hooks/useLoginToken');
        const logoutUserMock = vi.fn();

        (useLoginToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            logoutUser: logoutUserMock,
        });

        render(<MemoryRouter><TopBar /></MemoryRouter>);


        const userButton = screen.getByText(/usuario/i);
        fireEvent.click(screen.getByText(/usuario/i));


        const logoutButton = screen.getByRole('menuitem', { name: /logout/i }) as HTMLButtonElement;
        expect(logoutButton).toBeInTheDocument();

 
         fireEvent.click(logoutButton);



        expect(logoutUserMock).toHaveBeenCalled();

        
    });

    test('verifica que el componente cumple con la accesibilidad', () => {
        render(<TopBar />);
        const header = screen.getByRole('banner', { name: /barra superior/i });
        expect(header).toBeInTheDocument();
    
        const userButton = screen.getByText(/usuario/i);
        expect(userButton).toHaveAttribute('aria-hidden', 'false');
    });

    test('el menú cambia de estado correctamente', async () => {
        render(<TopBar />);
    
        const userButton = screen.getByText(/usuario/i);
    
        // Verificar estado inicial (cerrado)
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
        // Simular clic para abrir
        await fireEvent.click(userButton);
        expect(screen.getByRole('menu')).toBeInTheDocument();
    
        // Simular clic para cerrar
        await fireEvent.click(userButton);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

});