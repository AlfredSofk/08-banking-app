import React from "react";
import "./style.scss";

interface ErrorMessageProps {
  title?: string; // Título del mensaje de error
  description?: string; // Descripción del error
  errorDetails?: string; // Detalles adicionales del error
}

export const ErrorScreen: React.FC<ErrorMessageProps> = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again later.",
  errorDetails,
}) => {
  return (
    <section
      className="error-message"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <header className="error-message__header">
        <h1 className="error-message__title">{title}</h1>
      </header>
      <div className="error-message__body">
        <p className="error-message__description">{description}</p>
        {errorDetails && (
          <details className="error-message__details">
            <summary className="error-message__summary">More details</summary>
            <p>{errorDetails}</p>
          </details>
        )}
      </div>
    </section>
  );
};