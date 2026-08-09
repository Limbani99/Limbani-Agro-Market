import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './context/DataProvider'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 2000, style: { borderRadius: '12px', background: '#2d3748', color: '#ffffff' } }} />
        <App />
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
)
