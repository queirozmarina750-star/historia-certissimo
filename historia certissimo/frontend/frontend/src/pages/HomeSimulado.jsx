import React, { useState, useEffect } from 'react';
import QuestaoCard from '../components/QuestaoCard';
import FiltroRodape from '../components/FiltroRodape';
import './HomeSimulado.css';

// Página principal do simulado
export default function HomeSimulado() {

  // Questões carregadas do banco de dados
  const [listaDeQuestoes, setListaDeQuestoes] = useState([]);

  // Respostas marcadas pelo usuário
  const [respostas, setRespostas] = useState({});

  // Controla se o simulado já foi corrigido
  const [corrigido, setCorrigido] = useState(false);

  // Filtros utilizados na busca das questões
  const [filtros, setFiltros] = useState({
    vestibular: '',
    ano: '',
    topico: '',
    dificuldade: ''
  });

  // Busca as questões no back-end
  const carregarDadosDoServidor = async () => {
    try {

      // Recupera o token salvo após o login
      const token = localStorage.getItem('token');

      // Converte os filtros para parâmetros da URL
      const queryParams = new URLSearchParams(filtros).toString();

      const r = await fetch(
        `http://localhost:3000/questoes/enem?${queryParams}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Trata erros de autenticação
      if (!r.ok) {

        if (r.status === 401 || r.status === 403) {
          alert('Sessão expirada. Faça login novamente.');
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }

        throw new Error('Erro ao buscar dados.');
      }

      const dados = await r.json();

      // Atualiza a lista de questões
      setListaDeQuestoes(dados);

      // Limpa respostas anteriores
      setRespostas({});

      // Reinicia o estado da correção
      setCorrigido(false);

    } catch (erro) {
      console.error(erro);
      alert('Erro ao se conectar com o back-end.');
    }
  };

  // Executa a busca ao abrir a página
  useEffect(() => {
    carregarDadosDoServidor();
  }, []);

  // Salva a alternativa escolhida pelo usuário
  const handleResposta = (idQuestao, letra) => {
    setRespostas({
      ...respostas,
      [idQuestao]: letra
    });
  };

  // Atualiza os filtros selecionados
  const handleFiltro = (e) => {
    const { name, value } = e.target;

    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  // Corrige o simulado e calcula a nota
  const executarCorrecao = () => {
    let nota = 0;

    listaDeQuestoes.forEach(q => {
      const correta = (q.letra_correta || 'A')
        .trim()
        .toUpperCase();

      if (respostas[q.id_questao] === correta) {
        nota++;
      }
    });

    setCorrigido(true);

    alert(
      `Simulado finalizado com sucesso! Você obteve ${nota} acertos de um total de ${listaDeQuestoes.length}.`
    );
  };

  return (
    <div className="home-container">

      {/* Cabeçalho da página */}
      <div className="home-header">
        <h2 className="home-title">
          Área de Estudos — Simulado
        </h2>

        <button
          className="btn-sair"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          Sair
        </button>
      </div>

      {/* Lista de questões */}
      <div id="container-questoes">

        {listaDeQuestoes.length === 0 ? (
          <p className="sem-questoes">
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

        {/* Botão de correção */}
        {listaDeQuestoes.length > 0 && (
          <button
            onClick={executarCorrecao}
            className="btn-corrigir"
          >
            Corrigir Simulado
          </button>
        )}
      </div>

      {/* Rodapé com filtros */}
      <FiltroRodape
        filtros={filtros}
        onChangeFiltro={handleFiltro}
        onFiltrarClick={carregarDadosDoServidor}
      />
    </div>
  );
}