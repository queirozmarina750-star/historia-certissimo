import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Cabecalho.css';

// Componente responsável pelo cabeçalho da aplicação.
// Nele estão presentes o logotipo, os links de navegação e o botão de saída.
export default function Cabecalho() {

  // Hook utilizado para realizar navegações entre páginas
  const navigate = useNavigate();

  // Hook utilizado para identificar a rota atual e destacar o menu ativo
  const location = useLocation();

  // Função responsável por encerrar a sessão do usuário
  const deslogar = () => {

    // Remove o token armazenado no navegador
    localStorage.removeItem('token');

    // Redireciona o usuário para a página de login
    navigate('/login');
  };

  return (

    // Estrutura principal do cabeçalho
    <header className="cabecalho-container">

      {/* Área do logotipo da aplicação */}
      <div
        className="cabecalho-logo-wrapper"

        // Ao clicar no logotipo, o usuário retorna para a página inicial
        onClick={() => navigate('/home')}
      >

        {/* Ícone representativo da plataforma */}
        <div className="cabecalho-logo-icone">
          🦉
        </div>

        {/* Nome e descrição do sistema */}
        <div className="cabecalho-logo-texto">
          <h1>HISTÓRIA</h1>
          <p>QUESTÕES DE VESTIBULARES</p>
        </div>
      </div>

      {/* Menu de navegação */}
      <nav className="cabecalho-nav">

        {/* Link para a página inicial */}
        <span
          className={`cabecalho-link ${
            location.pathname === '/home' ? 'ativo' : ''
          }`}

          // Navega para a página Home
          onClick={() => navigate('/home')}
        >
          Início
        </span>

        {/* Link para a página de questões */}
        <span
          className={`cabecalho-link ${
            location.pathname.startsWith('/questoes') ? 'ativo' : ''
          }`}

          // Redireciona para a página de questões
          onClick={() => navigate('/questoes?f=vestibular')}
        >
          Questões
        </span>

        {/* Botão utilizado para sair da conta */}
        <button
          onClick={deslogar}
          className="btn-sair"
        >
          SAIR
        </button>

      </nav>
    </header>
  );
}