import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente responsável pela tela de login do sistema
// Aqui o usuário insere usuário e senha para acessar o simulado
export default function Login() {

  // Estado responsável por armazenar o usuário digitado
  const [usuario, setUsuario] = useState('');

  // Estado responsável por armazenar a senha digitada
  const [senha, setSenha] = useState('');

  // Hook usado para redirecionar o usuário entre páginas
  const navigate = useNavigate();

  // Função executada quando o formulário é enviado
  const handleLogin = async (e) => {

    // Evita recarregar a página ao enviar o formulário
    e.preventDefault();

    try {

      // Requisição para o back-end validando usuário e senha
      const r = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        // Envia os dados do login para o servidor
        body: JSON.stringify({
          usuario,
          senha
        })
      });

      // Converte a resposta do servidor para JSON
      const dados = await r.json();

      // Caso a autenticação falhe, exibe mensagem de erro
      if (!r.ok) {
        alert(dados.error || 'Erro ao fazer login.');
        return;
      }

      // Armazena o token de autenticação no navegador
      localStorage.setItem('token', dados.token);

      // Redireciona o usuário para a página inicial do sistema
      navigate('/home');

    } catch (err) {

      // Caso ocorra erro de conexão com o servidor
      console.error(err);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (

    // Container principal da tela de login
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        background: '#f0f2f5'
      }}
    >

      {/* Formulário de login */}
      <form
        onSubmit={handleLogin}
        style={{
          background: '#fff',
          padding: '4px 30px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '320px'
        }}
      >

        {/* Título da tela */}
        <h3 style={{ textAlign: 'center', color: '#333' }}>
          Acesso ao Simulado
        </h3>

        {/* Campo de usuário */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '0.9em'
            }}
          >
            Usuário:
          </label>

          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            placeholder="admin"
            required

            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Campo de senha */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '0.9em'
            }}
          >
            Senha:
          </label>

          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="123456"
            required

            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Botão de envio do formulário */}
        <button
          type="submit"
          style={{
            width: '100%',
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Entrar
        </button>

      </form>
    </div>
  );
}