import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { hashRouter } from './app/routes/index';

createRoot(document.getElementById('root')!).render(

  <>
    <RouterProvider router={hashRouter} />
  </>
)
