import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Cabecalho.css';

export default function Cabecalho() {
  const navigate = useNavigate();
  const location = useLocation();

  const deslogar = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="cabecalho-container">
      {/* LOGOTIPO */}
      <div
        className="cabecalho-logo-wrapper"
        onClick={() => navigate('/home')}
      >
        <div className="cabecalho-logo-icone">🦉</div>

        <div className="cabecalho-logo-texto">
          <h1>HISTÓRIA</h1>
          <p>QUESTÕES DE VESTIBULARES</p>
        </div>
      </div>

      <nav className="cabecalho-nav">
        <span
          className={`cabecalho-link ${
            location.pathname === '/home' ? 'ativo' : ''
          }`}
          onClick={() => navigate('/home')}
        >
          Início
        </span>

        <span
          className={`cabecalho-link ${
            location.pathname.startsWith('/questoes') ? 'ativo' : ''
          }`}
          onClick={() => navigate('/questoes?f=vestibular')}
        >
          Questões
        </span>

        <button onClick={deslogar} className="btn-sair">
          SAIR
        </button>
      </nav>
    </header>
  );
}