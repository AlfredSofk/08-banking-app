import { fireEvent, render, screen,  } from '@testing-library/react';
import { SideMenu } from '../../../../src/app/ui/components/SideMenu/index';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock de useNavigate
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('test para el componente SideMenu', async () => {

    const {useNavigate} = await import('react-router-dom'); 

    let navigateMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        navigateMock = vi.fn();
        (vi.mocked(useNavigate ) as unknown as ReturnType<typeof vi.fn>).mockReturnValue(navigateMock);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
  
    test('match snapshot', () => {
      const { asFragment } = render( 
            <MemoryRouter>
                <SideMenu />
            </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    test('renderiza correctamente con el menú expandido', () => {
        render(
            <MemoryRouter>
                <SideMenu />
            </MemoryRouter>
        );

        // Verificar que el menú principal está presente
        expect(screen.getByRole('navigation', { name: /Barra lateral de navegación/i })).toBeInTheDocument();

        // Verificar que las opciones principales están renderizadas
        expect(screen.getByLabelText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cuenta/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/ayuda/i)).toBeInTheDocument();
    });

    test('colapsa y expande el menú al hacer clic en el botón de toggle', () => {
        render(
            <MemoryRouter>
                <SideMenu />
            </MemoryRouter>
        );

        const toggleButton = screen.getByLabelText(/expandir menú/i);

        // Menú inicialmente expandido
        expect(screen.getByRole('navigation')).toHaveClass('sidebar--expanded');

        // Colapsar el menú
        fireEvent.click(toggleButton);
        expect(screen.getByRole('navigation')).not.toHaveClass('sidebar--expanded');

        // Expandir el menú nuevamente
        fireEvent.click(toggleButton);
        expect(screen.getByRole('navigation')).toHaveClass('sidebar--expanded');
    });

    test('navega correctamente al hacer clic en las opciones principales', () => {
        render(
            <MemoryRouter>
                <SideMenu />
            </MemoryRouter>
        );

        // Simular clic en "Inicio"
        fireEvent.click(screen.getByLabelText(/inicio/i));
        expect(navigateMock).toHaveBeenCalledWith('/home/inicio');

        // Simular clic en "Cuenta"
        fireEvent.click(screen.getByLabelText(/cuenta/i));
        expect(navigateMock).toHaveBeenCalledWith('/home/account');

        // Simular clic en "Ayuda"
        fireEvent.click(screen.getByLabelText(/ayuda/i));
        expect(navigateMock).toHaveBeenCalledWith('/home/about');
    });

    test('muestra y oculta las transacciones al hacer clic en el botón de dropdown', () => {
        render(
            <MemoryRouter>
                <SideMenu />
            </MemoryRouter>
        );

        const dropdownButton = screen.queryByTestId("botonDropdown")
        let subMenu = screen.queryByTestId("submenu") 
        
        // Verificar que las transacciones no están visibles inicialmente
        expect(subMenu).not.toBeInTheDocument();
        
        // Mostrar las transacciones
        fireEvent.click(dropdownButton);
        subMenu = screen.queryByTestId("submenu")
        expect(subMenu).toBeInTheDocument();

        const liTransaction =  subMenu.querySelectorAll('li')

        // Verificar transacciones específicas
        expect(liTransaction[0].querySelector('button')?.textContent).toContain('Retirar Cajero');
        expect(liTransaction[4].querySelector('button')?.textContent).toContain('Compra Web');


        // Ocultar las transacciones
        fireEvent.click(dropdownButton);
        expect(subMenu).not.toBeInTheDocument();
    });

    test('navega correctamente al seleccionar una transacción', () => {
        render(
            <MemoryRouter>
                <SideMenu />
            </MemoryRouter>
        );

        const dropdownButton = screen.queryByTestId("botonDropdown")

        // Mostrar las transacciones
        fireEvent.click(dropdownButton);
        const liTrasaction = screen.queryByTestId("submenu")?.querySelectorAll('li') 

        // Simular clic en una transacción
        const transactionItem = liTrasaction[0].querySelector('button') as HTMLButtonElement;
        fireEvent.click(transactionItem);

        expect(navigateMock).toHaveBeenCalledWith('/home/retiroATM');
    });
});