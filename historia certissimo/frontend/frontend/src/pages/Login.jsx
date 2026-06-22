import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const r = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario,
          senha
        })
      });

      const dados = await r.json();

      if (!r.ok) {
        alert(dados.error || 'Erro ao fazer login.');
        return;
      }

      localStorage.setItem('token', dados.token);

      navigate('/home');

    } catch (err) {
      console.error(err);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="login-container">

      <div className="overlay"></div>

      <form className="login-card" onSubmit={handleLogin}>

        <h1>Login</h1>

        <p className="subtitulo">
          Plataforma de Simulados Históricos
        </p>

        <div className="input-group">

          <label>Usuário</label>

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />

        </div>

        <div className="input-group">

          <label>Senha</label>

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />

        </div>

        <button type="submit">
          Entrar no Sistema
        </button>

      </form>

    </div>
  );
}