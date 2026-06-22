import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho';
import QuestaoCard from '../components/QuestaoCard';
import './Paginas.css';

// Página responsável por exibir o banco de questões
export default function PaginaQuestoes() {

  // Lista de questões carregadas do servidor
  const [listaDeQuestoes, setListaDeQuestoes] = useState([]);

  // Armazena as respostas do usuário
  const [respostas, setRespostas] = useState({});

  // Controla se as questões já foram corrigidas
  const [corrigido, setCorrigido] = useState(false);

  // Filtros aplicados
  const [filtros, setFiltros] = useState({
    vestibular: '',
    ano: '',
    topico: '',
    dificuldade: ''
  });

  useLocation();

  // Busca as questões do banco
  const carregarDadosDoServidor = async () => {
    try {

      const token = localStorage.getItem('token');

      const queryParams = new URLSearchParams(filtros).toString();

      const resposta = await fetch(
        `http://localhost:3000/questoes/enem?${queryParams}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!resposta.ok) {
        if (resposta.status === 401 || resposta.status === 403) {
          window.location.href = '/login';
          return;
        }

        throw new Error('Erro ao buscar dados.');
      }

      const dados = await resposta.json();

      setListaDeQuestoes(dados);
      setRespostas({});
      setCorrigido(false);

    } catch (erro) {
      console.error(erro);
    }
  };

  // Atualiza os filtros
  const onChangeFiltro = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  // Recarrega as questões quando os filtros mudam
  useEffect(() => {
    carregarDadosDoServidor();
  }, [filtros]);

  return (
    <div className="questoes-container">

      <Cabecalho />

      {/* Barra de filtros */}
      <div className="barra-filtros-topo">

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

        <select
          name="ano"
          value={filtros.ano}
          onChange={onChangeFiltro}
          className="seletor-historico"
        >
          <option value="">Todos os Anos</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2021">2021</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select
          name="topico"
          value={filtros.topico}
          onChange={onChangeFiltro}
          className="seletor-historico"
        >
          <option value="">Todos os Temas</option>
          <option value="Era Vargas">Era Vargas</option>
          <option value="Guerra Fria">Guerra Fria</option>
          <option value="Ditadura Militar no Brasil">
            Ditadura Militar no Brasil
          </option>
          <option value="Independência do Brasil">
            Independência do Brasil
          </option>
          <option value="Revolução Industrial">
            Revolução Industrial
          </option>
          <option value="Iluminismo">
            Iluminismo
          </option>
        </select>

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

      {/* Área principal */}
      <div className="conteudo-questoes">

        <div className="titulo-caderno">
          <h2 className="titulo-caderno-texto">
            Caderno de Questões
          </h2>
        </div>

        <div id="container-questoes">

          {listaDeQuestoes.length === 0 ? (

            <p className="mensagem-sem-questoes">
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
                  setRespostas({
                    ...respostas,
                    [id]: letra
                  })
                }
                corrigido={corrigido}
              />
            ))

          )}

          {listaDeQuestoes.length > 0 && (
            <button
              className="botao-corrigir"
              onClick={() => setCorrigido(true)}
            >
              Corrigir Simulado
            </button>
          )}

        </div>

      </div>

    </div>
  );
}