import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransactionWrapper } from '../../../../src/app/ui/components/TransactionWrapper';
import { vi } from 'vitest';
import { TransactionTypes } from '../../../../src/app/core/constants/transactionTypes';

// Mock del custom hook useTransactions
vi.mock('../../../../src/app/core/hooks/useTransaction', () => ({
    useTransactions: vi.fn(),
}));


describe('test para el componente TransactionWrapper', async () => {

    const {useTransactions} = await import('../../../../src/app/core/hooks/useTransaction');
    const mockUseTransactions = {
        state: {},
        retiroCajeroATM: vi.fn(),
        depositarCajeroATM: vi.fn(),
        depositarAgencia: vi.fn(),
        transferencias: vi.fn(),
        compraWeb: vi.fn(),
        compraEstablecimiento: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useTransactions as unknown as ReturnType<typeof vi.fn>).mockReturnValue({...mockUseTransactions});
    });

    test('match snapshot', () => {
        const { asFragment } = render( 
        <TransactionWrapper />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renderiza el componente Transaction para retiro ATM', () => {
        render(<TransactionWrapper transactionType={TransactionTypes.WITHDRAW} />);

        // Verificar que se renderiza el componente de retiro ATM
        expect(screen.getByTestId('title-transaction')).toHaveTextContent('retiro ATM');
    });

    test('renderiza el componente Transaction para deposito ATM', () => {
        render(<TransactionWrapper transactionType={TransactionTypes.DEPOSIT} />);

        // Verificar que se renderiza el componente de deposito ATM
        expect(screen.getByTestId('title-transaction')).toHaveTextContent('deposito ATM');
    });

    test('renderiza el componente Transaction para deposito Agencia', () => {
        render(<TransactionWrapper transactionType={TransactionTypes.DEPOSIT_ACCOUNT} />);

        // Verificar que se renderiza el componente de deposito Agencia
        expect(screen.getByTestId('title-transaction')).toHaveTextContent('deposito Agencia');
    });

    test('renderiza el componente Transaction para transferencias', () => {
        render(<TransactionWrapper transactionType={TransactionTypes.TRANSFER} />);

        // Verificar que se renderiza el componente de transferencias
        expect(screen.getByTestId('title-transaction')).toHaveTextContent('Transferencia');
    });

    test('renderiza el componente Transaction para compra Web', () => {
        render(<TransactionWrapper transactionType={TransactionTypes.PURCHASE_WEB} />);

        // Verificar que se renderiza el componente de compra Web
        expect(screen.getByTestId('title-transaction')).toHaveTextContent('Compra Web');
    });

    test('renderiza el componente Transaction para compra Establecimiento', () => {
        render(<TransactionWrapper transactionType={TransactionTypes.PURCHASE_STORE} />);

        // Verificar que se renderiza el componente de compra Establecimiento
        expect(screen.getByTestId('title-transaction')).toHaveTextContent('Compra Establecimiento');
    });
});