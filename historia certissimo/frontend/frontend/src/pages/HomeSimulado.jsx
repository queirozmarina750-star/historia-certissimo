import React, { useState, useEffect } from 'react';
import QuestaoCard from '../components/QuestaoCard';
import FiltroRodape from '../components/FiltroRodape';

export default function HomeSimulado() {
  const [listaDeQuestoes, setListaDeQuestoes] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [corrigido, setCorrigido] = useState(false);
  const [filtros, setFiltros] = useState({ vestibular: '', ano: '', topico: '', dificuldade: '' });

  const carregarDadosDoServidor = async () => {
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams(filtros).toString();
      
      const r = await fetch(`http://localhost:3000/questoes/enem?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!r.ok) {
        if(r.status === 401 || r.status === 403) {
          alert("Sessão expirada. Faça login novamente.");
          localStorage.removeItem('token');
          window.location.href = "/login";
          return;
        }
        throw new Error('Erro ao buscar dados.');
      }

      const dados = await r.json();
      setListaDeQuestoes(dados);
      setRespostas({}); 
      setCorrigido(false); 
    } catch (erro) {
      console.error(erro);
      alert('Erro ao se conectar com o back-end.');
    }
  };

  useEffect(() => {
    carregarDadosDoServidor();
  }, []);

  const handleResposta = (idQuestao, letra) => {
    setRespostas({ ...respostas, [idQuestao]: letra });
  };

  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const executarCorrecao = () => {
    let nota = 0;
    listaDeQuestoes.forEach(q => {
      const correta = (q.letra_correta || 'A').trim().toUpperCase();
      if (respostas[q.id_questao] === correta) nota++;
    });
    setCorrigido(true);
    alert(`Simulado finalizado com sucesso! Você obteve ${nota} acertos de um total de ${listaDeQuestoes.length}.`);
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '110px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: 0 }}>Área de Estudos — Simulado</h2>
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = "/login"; }} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85em' }}>Sair</button>
      </div>

      <div id="container-questoes">
        {listaDeQuestoes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777', padding: '50px 0', border: '1px dashed #ccc', borderRadius: '8px', background: '#fafafa' }}>
            Nenhuma questão registrada no banco corresponde aos filtros aplicados no rodapé inferior.
          </p>
        ) : (
          listaDeQuestoes.map((q, idx) => (
            <QuestaoCard 
              key={q.id_questao}
              q={q}
              index={idx}
              respostaUsuario={respostas[q.id_questao]}
              onChangeResposta={handleResposta}
              corrigido={corrigido}
            />
          ))
        )}

        {listaDeQuestoes.length > 0 && (
          <button 
            onClick={executarCorrecao}
            style={{ background: '#28a745', color: 'white', border: 'none', padding: '16px', fontSize: '1.1em', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(40, 167, 69, 0.2)', marginBottom: '30px' }}
          >
            Corrigir Simulado
          </button>
        )}
      </div>

      {/* RODAPÉ DO SISTEMA COM OS FILTROS DO POSTGRES */}
      <FiltroRodape 
        filtros={filtros}
        onChangeFiltro={handleFiltro}
        onFiltrarClick={carregarDadosDoServidor}
      />
    </div>
  );
}