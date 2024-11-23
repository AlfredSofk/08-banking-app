import { fireEvent, queryAllByRole, render, screen, waitFor } from '@testing-library/react';
import { Transaction } from '../../../../src/app/ui/components/Transaction/index';
import { vi } from 'vitest';
import { TransactionTargets } from '../../../../src/app/core/constants/transactionTypes';
import React from 'react';


describe('Test para el componente Transaction', () => {

    const mockTransactionHook = vi.fn();
    const mockState = {
        saldoGlobal: 10000,
        transacciones: [],
        username: 'testuser',
        userAccounts: [],
        loading: false,
        error: null,
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Match Snapshot', () => {
        
        const {asFragment}  = render(<Transaction state={mockState} titleTransaction='test' transactionTarget={TransactionTargets.RETIRO} transactionHook={mockTransactionHook} />);
        expect(asFragment()).toMatchSnapshot();

    });

    test('Deberia mostrar los mensajes de error cuando se envía un formulario inválido de tipo retiro', async() => {

        const { getByRole, findAllByRole } = render( <Transaction state={mockState} titleTransaction='test' transactionTarget={TransactionTargets.RETIRO} transactionHook={mockTransactionHook} />);

        const buttonLogin = getByRole('buttonTransaction');

        fireEvent.submit(buttonLogin);

        expect(await findAllByRole('alert')).toHaveLength(2);
        expect(mockTransactionHook).not.toBeCalled()
    })

    test('Deberia mostrar los mensajes de error cuando se envía un formulario inválido de tipo deposito', async() => {

        const { getByRole, findAllByRole } = render( <Transaction state={mockState} titleTransaction='test' transactionTarget={TransactionTargets.DEPOSITO} transactionHook={mockTransactionHook} />);

        const buttonLogin = getByRole('buttonTransaction');

        fireEvent.submit(buttonLogin);

        expect(await findAllByRole('alert')).toHaveLength(2);
        expect(mockTransactionHook).not.toBeCalled()
    })

    test('Deberia mostrar los mensajes de error cuando se envía un formulario inválido de tipo deposito', async() => {

        const { getByRole, findAllByRole } = render( <Transaction state={mockState} titleTransaction='test' transactionTarget={TransactionTargets.COMPRA} transactionHook={mockTransactionHook} />);

        const buttonLogin = getByRole('buttonTransaction');

        fireEvent.submit(buttonLogin);

        expect(await findAllByRole('alert')).toHaveLength(2);
        expect(mockTransactionHook).not.toBeCalled()
    })

    test('Deberia mostrar los mensajes de error cuando se envía un formulario inválido de tipo deposito', async() => {

        const { getByRole, findAllByRole } = render( <Transaction state={mockState} titleTransaction='test' transactionTarget={TransactionTargets.TRANSFERENCIA} transactionHook={mockTransactionHook} />);

        const buttonLogin = getByRole('buttonTransaction');

        fireEvent.submit(buttonLogin);

        expect(await findAllByRole('alert')).toHaveLength(3);
        expect(mockTransactionHook).not.toBeCalled()
    })

    test('No deberia mostrar un mensaje de error cuando los datos son validos retiro', async() => {        
        const { getByRole, getByLabelText, queryAllByRole } = render( <Transaction state={mockState} titleTransaction='retiro ATM' transactionTarget={TransactionTargets.RETIRO} transactionHook={mockTransactionHook} />);

        const accountNumberMock : string = "123456789"
        const amountMock : number = 100

        await waitFor(() =>  {
              fireEvent.input(getByRole("textbox", { name: /número de cuenta/i }), {
                  target: {
                    value: accountNumberMock,
                  },
                })
      
                fireEvent.input(getByLabelText("Monto a retirar"), {
                  target: {
                    value: amountMock,
                  },
                })
      
                fireEvent.submit(getByRole('buttonTransaction'));

            expect(queryAllByRole("alert")).toHaveLength(0)
            expect(mockTransactionHook).toBeCalledWith({ accountNumber: accountNumberMock, amount: amountMock })
        })
        expect (getByRole("textbox", { name: /número de cuenta/i })).toHaveValue(accountNumberMock)
    });    

    test('No deberia mostrar error cuando los datos de la trasferencia son validos', async() => {        
        const { getByRole, getByLabelText, queryAllByRole } = render( <Transaction state={mockState} titleTransaction='transferencia' transactionTarget={TransactionTargets.TRANSFERENCIA} transactionHook={mockTransactionHook} />);
        const accountNumberMock : string = "123456789"
        const amountMock : number = 100
        const accountNumberReceiverMock : string = "987654321"
        await waitFor(() =>  {
              fireEvent.input(getByRole("textbox", { name: /cuenta principal/i }), {
                  target: {
                    value: accountNumberMock,
                  },
                })
      
                fireEvent.input(getByLabelText("Monto a transferir"), {
                  target: {
                    value: amountMock,
                  },
                })
      
                fireEvent.input(getByRole("textbox", { name: /cuenta destino/i }), {
                  target: {
                    value: accountNumberReceiverMock,
                  },
                })
      
                fireEvent.submit(getByRole('buttonTransaction'));
      
            expect(queryAllByRole("alert")).toHaveLength(0)
            expect(mockTransactionHook).toBeCalledWith({ accountNumber: accountNumberMock, amount: amountMock, accountNumberReceiver: accountNumberReceiverMock })
        })
        expect (getByRole("textbox", { name: /cuenta principal/i })).toHaveValue(accountNumberMock)
        expect (getByRole("textbox", { name: /cuenta destino/i })).toHaveValue(accountNumberReceiverMock)
    });
});                     
