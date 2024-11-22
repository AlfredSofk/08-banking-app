import React from "react";
import { TransactionItem } from "../../../../src/app/ui/components/TransactionItem";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";



describe('test para el componente TransactionItem', () => {
    const mockHandleNavigate = vi.fn(); // Mock para handleNavigate

    beforeEach(() => {
        vi.clearAllMocks(); // Limpiar mocks antes de cada prueba
    });

    test('match snapshot', () => {
        const props = {
            path : '/home/inicio',
            handleNavigate : (path : string) => console.log(path)
        }

        const { asFragment } = render(
            <TransactionItem {...props} />
        );
        expect(asFragment()).toMatchSnapshot();
    });


    test('renderiza el botón con el título correcto basado en path', () => {
        const path = 'retiroATM';

        render(<TransactionItem path={path} handleNavigate={mockHandleNavigate} />);

        // Verificar que el botón muestra el título correcto
        expect(screen.getByRole('button')).toHaveTextContent('Retirar Cajero');
    });

    test('llama a handleNavigate con el path correcto al hacer clic', () => {
        const path = 'depositoATM';

        render(<TransactionItem path={path} handleNavigate={mockHandleNavigate} />);

        // Simular clic en el botón
        fireEvent.click(screen.getByRole('button'));

        // Verificar que handleNavigate fue llamado con el path correcto
        expect(mockHandleNavigate).toHaveBeenCalledWith(path);
        expect(mockHandleNavigate).toHaveBeenCalledTimes(1);
    });

    test('maneja un path desconocido correctamente', () => {
        const path = 'UNKNOWN_PATH';

        render(<TransactionItem path={path} handleNavigate={mockHandleNavigate} />);

        // Verificar que el botón muestra el path como texto por defecto
        expect(screen.getByRole('button')).toHaveTextContent('');
    });


    // test('renderiza correctamente el componente TransactionItem', () => {
    //     const props = {
    //         path : '/home/inicio',
    //         handleNavigate : (path : string) => console.log(path)
    //     }

    //     render( 
    //         <TransactionItem {...props} />
    //     );

    //     expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    // });
});