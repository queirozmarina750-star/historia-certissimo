import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho';
import QuestaoCard from '../components/QuestaoCard';
import './Paginas.css';

export default function PaginaQuestoes() {
  const [listaDeQuestoes, setListaDeQuestoes] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [corrigido, setCorrigido] = useState(false);
  const [filtros, setFiltros] = useState({
    vestibular: '',
    ano: '',
    topico: '',
    dificuldade: ''
  });

  const search = new URLSearchParams(useLocation().search);

  const carregarDadosDoServidor = async () => {
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams(filtros).toString();

      const r = await fetch(`http://localhost:3000/questoes/enem?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!r.ok) {
        if (r.status === 401 || r.status === 403) {
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
    }
  };

  const onChangeFiltro = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    carregarDadosDoServidor();
  }, [filtros]);

  return (
    <div className="questoes-container">
      <Cabecalho />

      {/* FILTROS */}
      <div className="barra-filtros-topo">

        {/* VESTIBULAR */}
        <select
          name="vestibular"
          value={filtros.vestibular}
          onChange={onChangeFiltro}
          className="seletor-historico"
        >
          <option value="">Todos Vestibulares</option>
          <option value="ENEM">ENEM</option>
          <option value="USP">USP</option>
          <option value="UNICAMP">UNICAMP</option>
        </select>

        {/* ANO */}
        <select
          name="ano"
          value={filtros.ano}
          onChange={onChangeFiltro}
          className="seletor-historico"
        >
          <option value="">Todos os Anos</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2021">2021</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        {/* TÓPICO (TEM QUE BATER COM O BANCO) */}
        <select
          name="topico"
          value={filtros.topico}
          onChange={onChangeFiltro}
          className="seletor-historico"
        >
          <option value="">Todos os Temas</option>

          <option value="Era Vargas">Era Vargas</option>
          <option value="Brasil Colonial e Ciclo do Ouro">Brasil Colonial</option>
          <option value="Independência do Brasil">Independência do Brasil</option>
          <option value="Ditadura Militar no Brasil">Ditadura Militar</option>
          <option value="Guerra Fria">Guerra Fria</option>
          <option value="Iluminismo">Iluminismo</option>
        </select>

        {/* DIFICULDADE (CORRIGIDO PARA BATER COM O BANCO) */}
        <select
          name="dificuldade"
          value={filtros.dificuldade}
          onChange={onChangeFiltro}
          className="seletor-historico"
        >
          <option value="">Todas Dificuldades</option>
          <option value="facil">Fácil</option>
          <option value="media">Médio</option>
          <option value="dificil">Difícil</option>
        </select>

      </div>

      {/* QUESTÕES */}
      <div style={{ maxWidth: '850px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '30px', borderLeft: '6px solid #e67e22', paddingLeft: '15px' }}>
          <h2 style={{ margin: 0, textTransform: 'uppercase' }}>
            Caderno de Questões
          </h2>
        </div>

        <div id="container-questoes">

          {listaDeQuestoes.length === 0 ? (
            <p style={{
              textAlign: 'center',
              padding: '50px 0',
              border: '2px dashed #e4d8c1',
              background: '#fffaf1'
            }}>
              Nenhuma questão encontrada para os filtros selecionados acima.
            </p>
          ) : (
            listaDeQuestoes.map((q, idx) => (
              <QuestaoCard
                key={q.id_questao}
                q={q}
                index={idx}
                respostaUsuario={respostas[q.id_questao]}
                onChangeResposta={(id, letra) =>
                  setRespostas({ ...respostas, [id]: letra })
                }
                corrigido={corrigido}
              />
            ))
          )}

          {listaDeQuestoes.length > 0 && (
            <button
              onClick={() => setCorrigido(true)}
              style={{
                background: '#e67e22',
                color: 'white',
                border: 'none',
                padding: '18px',
                fontSize: '1.2em',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: 'bold'
              }}
            >
              Corrigir Simulado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}