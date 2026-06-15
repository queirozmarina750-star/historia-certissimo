import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PaginaQuestoes from './pages/PaginaQuestoes';

// Componente responsável por proteger rotas privadas da aplicação.
// Ele verifica se o usuário está autenticado (via token no localStorage).
const RotaProtegida = ({ children }) => {

  // Recupera o token de autenticação salvo no navegador
  const token = localStorage.getItem('token');

  // Se existir token, libera o acesso à rota
  // Caso contrário, redireciona o usuário para a página de login
  return token ? children : <Navigate to="/login" />;
};

// Componente principal de rotas da aplicação
export default function App() {

  return (

    // BrowserRouter é responsável por permitir navegação entre páginas no React
    <BrowserRouter>

      {/* Definição de todas as rotas do sistema */}
      <Routes>

        {/* Rota pública: login (qualquer usuário pode acessar) */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida: Home (só acessa se estiver logado) */}
        <Route
          path="/home"
          element={
            <RotaProtegida>
              <Home />
            </RotaProtegida>
          }
        />

        {/* Rota protegida: página de questões (simulado) */}
        <Route
          path="/questoes"
          element={
            <RotaProtegida>
              <PaginaQuestoes />
            </RotaProtegida>
          }
        />

        {/* Rota coringa:
            qualquer URL inexistente redireciona para /home */}
        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </BrowserRouter>
  );
}