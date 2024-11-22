import { render, screen } from "@testing-library/react";
import { AccountCard } from "../../../../src/app/ui/components/AccountCard";
import React from "react";



describe('test para el componente AccountCard', () => {


    test('match snapshot', () => {

        const props = {
            accountNumber: "123456789", 
            balance :1000
        }

        const { asFragment } = render( 
            <AccountCard {...props} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renderiza correctamente el número de cuenta y el saldo', () => {
        // Datos de prueba
        const props = {
            accountNumber: '1234567890',
            balance: 2500.5,
        };

        // Renderizar el componente
        render(<AccountCard {...props} />);

        // Verificar que el número de cuenta aparece correctamente
        expect(screen.getByTestId('accountNumber')).toBeInTheDocument();
        expect(screen.getByTestId('balance')).toBeInTheDocument();
        
        const accountNumber = screen.getByTestId('accountNumber');
        expect(accountNumber.textContent).toContain('Número de Cuenta: 1234567890');

        const balance = screen.getByTestId('balance');
        expect(balance.textContent).toContain('Saldo: $2500.50');

    });

    test('formatea correctamente el saldo', () => {
        // Datos de prueba con un saldo específico
        const props = {
            accountNumber: '9876543210',
            balance: 1234.567,
        };

        // Renderizar el componente
        render(<AccountCard {...props} />);

        // Verificar que el saldo está formateado a dos decimales
        expect(screen.getByText((content) =>
            content.includes(`$${props.balance.toFixed(2)}`)
        )).toBeInTheDocument();
    });

    test('muestra mensajes específicos si el número de cuenta o saldo están vacíos', () => {
        // Datos de prueba con valores vacíos
        const props = {
            accountNumber: '',
            balance: 0,
        };

        // Renderizar el componente
        render(<AccountCard {...props} />);

        // Verificar que aparece un mensaje predeterminado para el número de cuenta vacío
        expect(screen.getByText((content) => content.includes('Número de Cuenta:'))).toBeInTheDocument();

        // Verificar que el saldo se muestra como $0.00
        const balance = screen.getByTestId('balance');
        expect(balance.textContent).toContain('Saldo: $0.00');
    });

});