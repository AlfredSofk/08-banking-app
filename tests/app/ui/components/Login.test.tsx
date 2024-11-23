import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from '../../../../src/app/ui/components/Login';
import React from 'react';
import { vi } from 'vitest';
import { IAuthState } from '../../../../src/app/core/interfaces/auth';

const mockLogin = vi.fn();

const mockState : IAuthState = {    
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};


describe('Test para el componente Login',  () => {

    test('match snapshot', () => {
        const { asFragment } = render( 
            <LoginForm state={mockState} loginUser={mockLogin} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('Deberia mostrar los mensajes de error cuando se envía un formulario inválido', async() => {

        const { getByRole, findAllByRole } = render( <LoginForm loginUser={mockLogin} state={mockState} />);

        const buttonLogin = getByRole('buttonLogin');

        fireEvent.submit(buttonLogin);

        expect(await findAllByRole('alert')).toHaveLength(2);
        expect(mockLogin).not.toBeCalled()
    })

    test('Debe mostrar un mensaje de error cuando el usuario no es válido', async() => {
        const { getByRole, getByLabelText } = render( <LoginForm loginUser={mockLogin} state={mockState} />);

        const userMock : string = "=-%^&"

        fireEvent.input(getByRole("textbox", { name: /usuario/i }), {
            target: {
              value: userMock
            },
          })


        fireEvent.input(getByLabelText("Contraseña"), {
            target: {
              value: "123456789",
            },
        })

        fireEvent.submit(getByRole('buttonLogin'));
        expect(await screen.findAllByRole("alert")).toHaveLength(1)
        expect(mockLogin).not.toBeCalled()
        expect(getByRole("textbox", { name: /usuario/i })).toHaveValue(userMock)
        expect(getByLabelText("Contraseña")).toHaveValue("123456789")
    })

    test('Debe mostrar un mensaje de error cuando la contraseña no es válida', async() => {
        const { getByRole, getByLabelText } = render( <LoginForm loginUser={mockLogin} state={mockState} />);

        const userMock : string = "pablo"
        const passwordMock : string = ""

        fireEvent.input(getByRole("textbox", { name: /usuario/i }), {
            target: {
              value: userMock,
            },
          })

          fireEvent.input(getByLabelText("Contraseña"), {
            target: {
              value: passwordMock,
            },
          })

          fireEvent.submit(getByRole('buttonLogin'));
          expect(await screen.findAllByRole("alert")).toHaveLength(1)
          expect(mockLogin).not.toBeCalled()
          expect (getByRole("textbox", { name: /usuario/i })).toHaveValue(userMock)
          expect(getByLabelText("Contraseña")).toHaveValue(passwordMock)
    });

    test('No deberia mostrar un mensaje de error cuando los datos son validos', async() => {
        const { getByRole, getByLabelText, queryAllByRole } = render( <LoginForm loginUser={mockLogin} state={mockState} />);

        const userMock : string = "pablo"
        const passwordMock : string = "123456789"

        fireEvent.input(getByRole("textbox", { name: /usuario/i }), {
            target: {
              value: userMock,
            },
          })

          fireEvent.input(getByLabelText("Contraseña"), {
            target: {
              value: passwordMock,
            },
          })

          fireEvent.submit(getByRole('buttonLogin'));
        //   expect(await queryAllByRole("alert")).toHaveLength(0)

          await waitFor(() => expect(queryAllByRole("alert")).toHaveLength(0))
          expect(mockLogin).toBeCalledWith({ username: userMock, password: passwordMock })
          expect (getByRole("textbox", { name: /usuario/i })).toHaveValue(userMock)
          expect(getByLabelText("Contraseña")).toHaveValue(passwordMock)
    });
});

