import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Arquivo principal (entry point) da aplicação React.
// Ele é responsável por "iniciar" o React e renderizar o App na tela do navegador.

createRoot(document.getElementById('root')).render(
  // StrictMode é um modo de desenvolvimento do React que ajuda a identificar problemas
  // Ele não altera a interface visual, apenas ativa verificações extras
  <StrictMode>

    {/* Componente principal da aplicação */}
    {/* Tudo que existe no sistema (rotas, páginas, login, etc) nasce dentro do App */}
    <App />

  </StrictMode>,
)