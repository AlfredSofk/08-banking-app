import { render, screen } from '@testing-library/react';
import { ErrorScreen } from '../../../../src/app/ui/components/Error/index';
import React from 'react';



describe('Test para el componente ErrorScreen', () => {
    test('match snapshot', () => {
        const { asFragment } = render(<ErrorScreen />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renderiza el título y la descripción por defecto', () => {
        render(<ErrorScreen />);
    
        // Verificar que el título y la descripción por defecto están presentes
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
        expect(screen.getByRole('alert')).toHaveAttribute('aria-atomic', 'true');
    
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(
          screen.getByText(
            'An unexpected error occurred. Please try again later.'
          )
        ).toBeInTheDocument();
      });
    
      test('renderiza el título y la descripción personalizados', () => {
        render(
          <ErrorScreen
            title="Custom Error"
            description="This is a custom error description."
          />
        );
    
        // Verificar que se renderizan las props personalizadas
        expect(screen.getByText('Custom Error')).toBeInTheDocument();
        expect(
          screen.getByText('This is a custom error description.')
        ).toBeInTheDocument();
      });
    
      test('no renderiza detalles si errorDetails no está presente', () => {
        render(<ErrorScreen />);
    
        // Verificar que los detalles no están en el documento
        expect(screen.queryByText('More details')).not.toBeInTheDocument();
      });
    
      test('renderiza los detalles del error cuando errorDetails está presente', () => {
        const errorDetails = 'Stack trace: line 42';
        render(<ErrorScreen errorDetails={errorDetails} />);
    
        // Verificar que los detalles están en el documento
        expect(screen.getByText('More details')).toBeInTheDocument();
        expect(screen.getByText(errorDetails)).toBeInTheDocument();
      });
    
      test('verifica que los atributos de accesibilidad estén configurados correctamente', () => {
        render(<ErrorScreen />);
    
        const alertSection = screen.getByRole('alert');
    
        // Verificar que los atributos ARIA están presentes y configurados correctamente
        expect(alertSection).toHaveAttribute('aria-live', 'assertive');
        expect(alertSection).toHaveAttribute('aria-atomic', 'true');
      });


});