import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#f0f2f5' }}>
      <form onSubmit={handleLogin} style={{ background: '#fff', padding: '4px 30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '320px' }}>
        <h3 style={{ textAlign: 'center', color: '#333' }}>Acesso ao Simulado</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Usuário:</label>
          <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="admin" required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em' }}>Senha:</label>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="123456" required />
        </div>
        <button type="submit" style={{ width: '100%', background: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Entrar</button>
      </form>
    </div>
  );
}