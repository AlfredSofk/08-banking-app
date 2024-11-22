import { render, screen } from "@testing-library/react";
import { Dashboard } from "../../../../src/app/ui/components/Dashboard";
import React from "react";


describe('test para el componente Dashboard', () => {
    const mockState = {
        saldoGlobal: 5000,
        transacciones: [],
        username: 'TestUser',
        userAccounts: [
            { number: '123456789', amount: 1500 },
            { number: '987654321', amount: 3500 },
        ],
        loading: false,
        error: null,
    };

    test('match snapshot', () => {
        const { asFragment } = render( 
            <Dashboard state={mockState} />
    );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renderiza correctamente el título y el saldo global', () => {
        render(<Dashboard state={mockState} />);

        // Verificar el título
        expect(screen.getByRole('heading', { name: /resumen de cuentas/i })).toBeInTheDocument();

        // Verificar el saldo global
        expect(screen.getByRole('general-balance')).toHaveTextContent('5000.00');
    });

    test('renderiza las cuentas del usuario correctamente', () => {
        render(<Dashboard state={mockState} />);

        const account1 = screen.getByTestId('account-123456789');
        expect(account1).toBeInTheDocument();
        expect(account1).toHaveTextContent('Número de Cuenta: 123456789Saldo: $1500');

        const account2 = screen.getByTestId('account-987654321');
        expect(account2).toBeInTheDocument();
        expect(account2).toHaveTextContent('Número de Cuenta: 987654321Saldo: $3500');

    });

    test('muestra un mensaje cuando no hay cuentas de usuario', () => {
        const emptyState = { ...mockState, userAccounts: [] };

        render(<Dashboard state={emptyState} />);

        // Verificar que no hay cuentas
        expect(screen.queryByTestId(/^account-/)).not.toBeInTheDocument();
        expect(screen.getByText(/no hay cuentas disponibles/i)).toBeInTheDocument();
    });


});