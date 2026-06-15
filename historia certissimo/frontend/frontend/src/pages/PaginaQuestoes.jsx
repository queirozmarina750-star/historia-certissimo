import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho';
import QuestaoCard from '../components/QuestaoCard';
import './Paginas.css';

// Página responsável por exibir o banco de questões com filtros no topo,
// permitindo ao usuário visualizar, responder e corrigir questões.
export default function PaginaQuestoes() {

  // Lista de questões carregadas do back-end
  const [listaDeQuestoes, setListaDeQuestoes] = useState([]);

  // Armazena as respostas do usuário (id da questão → alternativa marcada)
  const [respostas, setRespostas] = useState({});

  // Controla se o simulado já foi corrigido ou não
  const [corrigido, setCorrigido] = useState(false);

  // Estado dos filtros aplicados na busca das questões
  const [filtros, setFiltros] = useState({
    vestibular: '',
    ano: '',
    topico: '',
    dificuldade: ''
  });

  // Hook usado apenas para acessar parâmetros da URL (caso necessário futuramente)
  const search = new URLSearchParams(useLocation().search);

  // Função responsável por buscar questões no back-end usando os filtros atuais
  const carregarDadosDoServidor = async () => {
    try {

      // Recupera o token de autenticação salvo no navegador
      const token = localStorage.getItem('token');

      // Converte os filtros em query string (?ano=2024&vestibular=ENEM...)
      const queryParams = new URLSearchParams(filtros).toString();

      // Requisição para o back-end buscando questões filtradas
      const r = await fetch(
        `http://localhost:3000/questoes/enem?${queryParams}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Tratamento de erro de autenticação ou requisição
      if (!r.ok) {
        if (r.status === 401 || r.status === 403) {
          window.location.href = '/login';
          return;
        }

        throw new Error('Erro ao buscar dados.');
      }

      // Converte resposta em JSON
      const dados = await r.json();

      // Atualiza lista de questões na tela
      setListaDeQuestoes(dados);

      // Limpa respostas anteriores ao mudar filtros
      setRespostas({});

      // Reseta estado de correção
      setCorrigido(false);

    } catch (erro) {
      console.error(erro);
    }
  };

  // Atualiza os filtros conforme o usuário seleciona opções
  const onChangeFiltro = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  // Sempre que os filtros mudam, novas questões são carregadas automaticamente
  useEffect(() => {
    carregarDadosDoServidor();
  }, [filtros]);

  return (

    // Container principal da página de questões
    <div className="questoes-container">

      {/* Cabeçalho fixo do sistema */}
      <Cabecalho />

      {/* Barra de filtros no topo da página */}
      <div className="barra-filtros-topo">

        {/* FILTRO: Vestibular */}
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

        {/* FILTRO: Ano */}
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

        {/* FILTRO: Tema / Tópico da questão */}
        <select
          name="topico"
          value={filtros.topico}
          onChange={onChangeFiltro}
          className="seletor-historico"
        >
          <option value="">Todos os Temas</option>

          <option value="Era Vargas">Era Vargas</option>
          <option value="Guerra Fria">Guerra Fria</option>
          <option value="Ditadura Militar no Brasil">Ditadura Militar no Brasil</option>
          <option value="Independência do Brasil">Independência do Brasil</option>
          <option value="Cultura Brasileira e Movimentos Artísticos">
            Cultura Brasileira e Movimentos Artísticos
          </option>
          <option value="Desigualdade Social e Racismo no Brasil">
            Desigualdade Social e Racismo no Brasil
          </option>
          <option value="Direitos Políticos e Cidadania">
            Direitos Políticos e Cidadania
          </option>
          <option value="Revolução Industrial">Revolução Industrial</option>
          <option value="Absolutismo e Sociedade de Corte">
            Absolutismo e Sociedade de Corte
          </option>
          <option value="Genocídio em Ruanda">Genocídio em Ruanda</option>
          <option value="Imperialismo e Neocolonialismo">
            Imperialismo e Neocolonialismo
          </option>
          <option value="Segundo Reinado">Segundo Reinado</option>
          <option value="Rotas da Seda e Comércio Medieval">
            Rotas da Seda e Comércio Medieval
          </option>
          <option value="Iluminismo">Iluminismo</option>
          <option value="República Velha">República Velha</option>
          <option value="Brasil Colonial e Ciclo do Ouro">
            Brasil Colonial e Ciclo do Ouro
          </option>
          <option value="Redemocratização do Brasil">
            Redemocratização do Brasil
          </option>
          <option value="Povos Indígenas no Brasil">
            Povos Indígenas no Brasil
          </option>
          <option value="História das Ditaduras">
            História das Ditaduras
          </option>
          <option value="Idade Média e Comércio Medieval">
            Idade Média e Comércio Medieval
          </option>
        </select>

        {/* FILTRO: Dificuldade da questão */}
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

      {/* ÁREA PRINCIPAL DE QUESTÕES */}
      <div
        style={{
          maxWidth: '850px',
          margin: '40px auto',
          padding: '0 20px'
        }}
      >

        {/* Título da página */}
        <div
          style={{
            marginBottom: '30px',
            borderLeft: '6px solid #e67e22',
            paddingLeft: '15px'
          }}
        >
          <h2 style={{ margin: 0, textTransform: 'uppercase' }}>
            Caderno de Questões
          </h2>
        </div>

        {/* Lista de questões */}
        <div id="container-questoes">

          {/* Caso não existam questões */}
          {listaDeQuestoes.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                padding: '50px 0',
                border: '2px dashed #e4d8c1',
                background: '#fffaf1'
              }}
            >
              Nenhuma questão encontrada para os filtros selecionados acima.
            </p>
          ) : (
            // Renderização das questões
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

          {/* Botão de correção do simulado */}
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