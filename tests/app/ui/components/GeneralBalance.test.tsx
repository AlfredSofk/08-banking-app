import { render, screen } from "@testing-library/react";
import { GeneralBalance } from "../../../../src/app/ui/components/GeneralBalance";
import React from "react";




describe('Test para el componente GeneralBalance', () => {

    test('match snapshot', () => {

        const props ={
            balance : 1000
        }

        const { asFragment } = render(
            <GeneralBalance {...props} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renderiza correctamente el título y el ícono', () => {
        render(<GeneralBalance balance={1234.56} />);

        // Verificar que el título está presente
        expect(screen.getByText(/balance general/i)).toBeInTheDocument();

        // Verificar que el ícono de dólar está presente
        const dollarIcon = screen.getByText((content, element) => element?.tagName === 'svg');
        expect(dollarIcon).toBeInTheDocument();
    });


    test('renderiza correctamente el balance formateado', () => {
        render(<GeneralBalance balance={1234.567} />);

        // Verificar que el balance está formateado a dos decimales
        expect(screen.getByRole('general-balance')).toHaveTextContent('1234.57');
    });

    test('maneja valores de balance negativos', () => {
        render(<GeneralBalance balance={-500.5} />);

        // Verificar que los valores negativos se renderizan correctamente
        expect(screen.getByRole('general-balance')).toHaveTextContent('-500.50');
    });

    test('maneja valores de balance igual a 0', () => {
        render(<GeneralBalance balance={0} />);

        // Verificar que el balance se muestra como 0.00
        expect(screen.getByRole('general-balance')).toHaveTextContent('0.00');
    });

});