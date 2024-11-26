import  { ReactElement } from 'react';

// Tipo para las rutas hijas
interface RouteChild {
  path: string; // Ruta del hijo
  index?: boolean; // Indica si es la ruta principal (index)
  element: ReactElement; // Componente asociado
}

// Tipo para la ruta principal
interface RouteDef {
  path: string; // Ruta del padre
  element: ReactElement; // Componente principal
  errorElement?: ReactElement; // Componente en caso de error
  children?: RouteChild[]; // Rutas hijas
}

// Tipo completo para la definición del router
export type RouterDef = RouteDef[];