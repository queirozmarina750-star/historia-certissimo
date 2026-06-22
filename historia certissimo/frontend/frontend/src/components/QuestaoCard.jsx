import React from 'react';
import './QuestaoCard.css';

// Componente responsável por exibir uma questão individual,
// permitir a escolha de uma alternativa e mostrar o resultado da correção
export default function QuestaoCard({
  q,
  index,
  respostaUsuario,
  onChangeResposta,
  corrigido
}) {

  // Obtém a letra correta da questão.
  // Caso não exista nenhuma letra cadastrada no banco,
  // a letra A é utilizada como padrão.
  const letraCorreta = (q.letra_correta || 'A')
    .trim()
    .toUpperCase();

  // Função responsável por definir qual classe CSS será aplicada
  // em cada alternativa, dependendo do resultado da correção.
  const obterClasseOpcao = (letraOpcao) => {

    // Antes da correção todas as alternativas possuem o estilo padrão
    if (!corrigido) return 'opcao';

    // Se a alternativa for a correta, ela ficará destacada em verde
    if (letraOpcao === letraCorreta) {
      return 'opcao correta';
    }

    // Se o usuário marcou esta alternativa e ela estiver errada,
    // ela ficará destacada em vermelho
    if (
      respostaUsuario === letraOpcao &&
      respostaUsuario !== letraCorreta
    ) {
      return 'opcao errada';
    }

    // As demais alternativas permanecem com o estilo padrão
    return 'opcao';
  };

  // Função responsável por definir a aparência da caixa
  // de feedback exibida após a correção
  const obterClasseFeedback = () => {

    // Caso o usuário não tenha respondido a questão
    if (!respostaUsuario) {
      return 'feedback nao-respondida';
    }

    // Caso tenha respondido, verifica se acertou ou errou
    return respostaUsuario === letraCorreta
      ? 'feedback acertou'
      : 'feedback errou';
  };

  return (

    // Container principal da questão
    <div className="questao-card">

      {/* Enunciado da questão */}
      <p className="enunciado">
        <strong>Questão {index + 1}:</strong>
        {' '}
        {q.enunciado}
      </p>

      {/* Informações adicionais da questão */}
      <div className="info-container">

        {/* Nome do vestibular */}
        <span className="info-tag destaque">
          {q.nome_vestibular}
        </span>

        {/* Ano da prova */}
        <span className="info-tag">
          Ano: {q.ano}
        </span>

        {/* Tema ou tópico relacionado à questão */}
        <span className="info-tag">
          Tema: {q.nome_topico}
        </span>

        {/* Grau de dificuldade da questão */}
        <span className="info-tag">
          Nível: {q.dificuldade}
        </span>

      </div>

      {/* Linha divisória entre as informações e as alternativas */}
      <hr className="linha-divisoria" />

      {/* Área responsável pelas alternativas */}
      <div className="opcoes">

        {/* Percorre as letras A, B, C, D e E criando cada alternativa */}
        {['A', 'B', 'C', 'D', 'E'].map(letra => (

          // Label correspondente a cada alternativa
          <label
            key={letra}
            className={obterClasseOpcao(letra)}
          >

            {/* Botão de seleção da resposta */}
            <input
              type="radio"

              // Garante que apenas uma alternativa possa ser escolhida
              name={`questao_${q.id_questao}`}

              value={letra}

              // Verifica se esta alternativa é a selecionada
              checked={respostaUsuario === letra}

              // Envia para o componente pai a alternativa escolhida
              onChange={() =>
                onChangeResposta(q.id_questao, letra)
              }

              // Depois da correção o usuário não pode mais alterar a resposta
              disabled={corrigido}
            />

            {/* Texto exibido ao lado do botão */}
            <strong>{letra})</strong>
            {' '}
            Marcar Alternativa {letra}

          </label>

        ))}
      </div>

      {/* A área de feedback aparece somente após a correção */}
      {corrigido && (

        <div className={obterClasseFeedback()}>

          {/* Caso a questão não tenha sido respondida */}
          {!respostaUsuario ? (

            <p>
              <strong>⚠️ Não respondida!</strong>
              {' '}
              O gabarito correto é a Letra {letraCorreta}.
            </p>

          ) : respostaUsuario === letraCorreta ? (

            // Caso o usuário tenha acertado
            <p>
              <strong>✔ Você acertou!</strong>
              {' '}
              Parabéns.
            </p>

          ) : (

            // Caso o usuário tenha errado
            <p>
              <strong>❌ Você errou!</strong>
              {' '}
              A resposta correta é a Letra {letraCorreta}.
            </p>

          )}

          {/* Caixa contendo a explicação da questão */}
          <div className="explicacao">

            <strong>Explicação:</strong>

            {/* Comentário cadastrado no banco de dados.
                Caso não exista, é exibida uma mensagem padrão */}
            {
              q.comentario ||
              'Nenhuma explicação cadastrada para esta questão.'
            }

          </div>

        </div>

      )}

    </div>
  );
}