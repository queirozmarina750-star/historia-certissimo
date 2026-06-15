import React, { useState, useEffect } from 'react';
import QuestaoCard from '../components/QuestaoCard';
import FiltroRodape from '../components/FiltroRodape';

// Página principal do simulado, responsável por:
// - Buscar questões no back-end
// - Gerenciar respostas do usuário
// - Aplicar filtros
// - Executar correção do simulado
export default function HomeSimulado() {

  // Lista de questões recebidas do servidor
  const [listaDeQuestoes, setListaDeQuestoes] = useState([]);

  // Armazena as respostas do usuário (ex: {1: 'A', 2: 'C'})
  const [respostas, setRespostas] = useState({});

  // Indica se o simulado já foi corrigido ou não
  const [corrigido, setCorrigido] = useState(false);

  // Filtros utilizados na busca das questões no banco de dados
  const [filtros, setFiltros] = useState({
    vestibular: '',
    ano: '',
    topico: '',
    dificuldade: ''
  });

  // Função responsável por buscar as questões no back-end
  const carregarDadosDoServidor = async () => {
    try {

      // Recupera o token de autenticação salvo no navegador
      const token = localStorage.getItem('token');

      // Converte os filtros em query string (ex: ?ano=2024&vestibular=ENEM)
      const queryParams = new URLSearchParams(filtros).toString();

      // Requisição para o back-end buscando as questões filtradas
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

      // Verifica erros de autenticação ou requisição
      if (!r.ok) {
        if (r.status === 401 || r.status === 403) {

          // Caso o token esteja inválido, desloga o usuário
          alert('Sessão expirada. Faça login novamente.');
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }

        throw new Error('Erro ao buscar dados.');
      }

      // Converte resposta do servidor para JSON
      const dados = await r.json();

      // Atualiza lista de questões na tela
      setListaDeQuestoes(dados);

      // Limpa respostas anteriores ao recarregar questões
      setRespostas({});

      // Remove estado de correção (nova tentativa)
      setCorrigido(false);

    } catch (erro) {
      console.error(erro);
      alert('Erro ao se conectar com o back-end.');
    }
  };

  // Executa a busca de questões apenas uma vez ao abrir a página
  useEffect(() => {
    carregarDadosDoServidor();
  }, []);

  // Atualiza a resposta de uma questão específica
  const handleResposta = (idQuestao, letra) => {
    setRespostas({
      ...respostas,
      [idQuestao]: letra
    });
  };

  // Atualiza os filtros conforme o usuário seleciona opções no rodapé
  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  // Função responsável por corrigir o simulado
  const executarCorrecao = () => {
    let nota = 0;

    // Percorre todas as questões para comparar respostas
    listaDeQuestoes.forEach(q => {
      const correta = (q.letra_correta || 'A')
        .trim()
        .toUpperCase();

      // Verifica se a resposta do usuário está correta
      if (respostas[q.id_questao] === correta) {
        nota++;
      }
    });

    // Marca simulado como corrigido
    setCorrigido(true);

    // Exibe resultado final para o usuário
    alert(
      `Simulado finalizado com sucesso! Você obteve ${nota} acertos de um total de ${listaDeQuestoes.length}.`
    );
  };

  return (

    // Container principal da página
    <div
      style={{
        padding: '20px',
        paddingBottom: '110px', // espaço para o rodapé fixo
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif'
      }}
    >

      {/* Cabeçalho da área de estudos */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'between', // (atenção: deveria ser space-between)
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <h2 style={{ color: '#333', margin: 0 }}>
          Área de Estudos — Simulado
        </h2>

        {/* Botão de logout rápido */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          style={{
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85em'
          }}
        >
          Sair
        </button>
      </div>

      {/* Área onde as questões são renderizadas */}
      <div id="container-questoes">

        {/* Caso não existam questões retornadas */}
        {listaDeQuestoes.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: '#777',
              padding: '50px 0',
              border: '1px dashed #ccc',
              borderRadius: '8px',
              background: '#fafafa'
            }}
          >
            Nenhuma questão registrada no banco corresponde aos filtros aplicados no rodapé inferior.
          </p>
        ) : (
          // Renderiza cada questão individualmente
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

        {/* Botão de correção do simulado */}
        {listaDeQuestoes.length > 0 && (
          <button
            onClick={executarCorrecao}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '16px',
              fontSize: '1.1em',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(40, 167, 69, 0.2)',
              marginBottom: '30px'
            }}
          >
            Corrigir Simulado
          </button>
        )}
      </div>

      {/* Rodapé com filtros dinâmicos do sistema */}
      <FiltroRodape
        filtros={filtros}
        onChangeFiltro={handleFiltro}
        onFiltrarClick={carregarDadosDoServidor}
      />
    </div>
  );
}