import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Loader from './components/general/Loader';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Loader />
  </StrictMode>,
)
