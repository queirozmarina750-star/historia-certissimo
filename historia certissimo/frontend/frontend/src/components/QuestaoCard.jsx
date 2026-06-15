import React from 'react';

// Componente responsável por exibir uma questão individual,
// permitir que o usuário selecione uma alternativa e mostrar a correção.
export default function QuestaoCard({
  q,
  index,
  respostaUsuario,
  onChangeResposta,
  corrigido
}) {

  // Garante que a letra correta sempre exista e fique em maiúsculo
  const letraCorreta = (q.letra_correta || 'A').trim().toUpperCase();

  // Função responsável por definir a aparência de cada alternativa
  const obterEstiloLabel = (letraOpcao) => {

    // Estilo padrão utilizado antes da correção
    const padrao = {
      margin: '10px 0',
      display: 'block',
      cursor: corrigido ? 'default' : 'pointer',
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s'
    };

    // Enquanto o usuário ainda não corrigiu, todas as alternativas ficam iguais
    if (!corrigido) return padrao;

    // Após a correção, a alternativa correta é destacada em verde
    if (letraOpcao === letraCorreta) {
      return {
        ...padrao,
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        color: '#155724',
        fontWeight: 'bold'
      };
    }

    // Caso o usuário tenha marcado uma alternativa errada,
    // ela é destacada em vermelho
    if (
      respostaUsuario === letraOpcao &&
      respostaUsuario !== letraCorreta
    ) {
      return {
        ...padrao,
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        color: '#721c24'
      };
    }

    // As demais alternativas permanecem com o estilo normal
    return padrao;
  };

  return (

    // Caixa principal da questão
    <div
      style={{
        background: '#f9f9f9',
        border: '1px solid #ddd',
        padding: '20px',
        marginBottom: '25px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}
    >

      {/* Enunciado da questão */}
      <p
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5',
          color: '#222'
        }}
      >
        <strong>Questão {index + 1}:</strong> {q.enunciado}
      </p>

      {/* Informações extras da questão */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          margin: '12px 0'
        }}
      >

        {/* Nome do vestibular */}
        <span
          style={{
            fontSize: '0.75em',
            background: '#e9ecef',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#495057',
            fontWeight: 'bold'
          }}
        >
          {q.nome_vestibular}
        </span>

        {/* Ano da prova */}
        <span
          style={{
            fontSize: '0.75em',
            background: '#e9ecef',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#495057'
          }}
        >
          Ano: {q.ano}
        </span>

        {/* Tema da questão */}
        <span
          style={{
            fontSize: '0.75em',
            background: '#e9ecef',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#495057'
          }}
        >
          Tema: {q.nome_topico}
        </span>

        {/* Nível de dificuldade */}
        <span
          style={{
            fontSize: '0.75em',
            background: '#e9ecef',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#495057'
          }}
        >
          Nível: {q.dificuldade}
        </span>
      </div>

      {/* Linha divisória entre o enunciado e as alternativas */}
      <hr
        style={{
          border: 0,
          borderTop: '1px solid #eee',
          margin: '15px 0'
        }}
      />

      {/* Área das alternativas */}
      <div className="opcoes">

        {/* Percorre as letras A, B, C, D e E para gerar as opções */}
        {['A', 'B', 'C', 'D', 'E'].map(letra => (

          // Cada alternativa é exibida dentro de um label
          <label
            key={letra}
            style={obterEstiloLabel(letra)}
          >

            {/* Radio button para selecionar a resposta */}
            <input
              type="radio"
              name={`questao_${q.id_questao}`}
              value={letra}
              checked={respostaUsuario === letra}

              // Envia para o componente pai qual alternativa foi escolhida
              onChange={() =>
                onChangeResposta(q.id_questao, letra)
              }

              // Após corrigir, as respostas são bloqueadas
              disabled={corrigido}
              style={{ marginRight: '8px' }}
            />

            <strong>{letra})</strong> Marcar Alternativa {letra}
          </label>
        ))}
      </div>

      {/* Caixa de feedback que aparece somente após a correção */}
      {corrigido && (

        <div
          style={{
            marginTop: '15px',
            padding: '15px',
            borderRadius: '6px',
            border: '1px solid',

            // Define a cor da caixa dependendo do resultado
            backgroundColor:
              !respostaUsuario
                ? '#fff3cd'
                : respostaUsuario === letraCorreta
                ? '#e2f0d9'
                : '#fce8e6',

            borderColor:
              !respostaUsuario
                ? '#ffeeba'
                : respostaUsuario === letraCorreta
                ? '#c3e6cb'
                : '#f5c6cb',

            color:
              !respostaUsuario
                ? '#856404'
                : respostaUsuario === letraCorreta
                ? '#2e7d32'
                : '#c62828'
          }}
        >

          {/* Mensagem exibida para o usuário conforme o resultado */}
          {!respostaUsuario ? (
            <p style={{ margin: '0' }}>
              <strong>⚠️ Não respondida!</strong>
              {' '}O gabarito correto é a Letra {letraCorreta}.
            </p>

          ) : respostaUsuario === letraCorreta ? (

            <p style={{ margin: '0' }}>
              <strong>✔ Você acertou!</strong> Parabéns.
            </p>

          ) : (

            <p style={{ margin: '0' }}>
              <strong>❌ Você errou!</strong>
              {' '}A resposta correta é a Letra {letraCorreta}.
            </p>
          )}

          {/* Comentário da questão armazenado no banco de dados */}
          <div
            style={{
              marginTop: '12px',
              background: '#ffffff',
              padding: '12px',
              borderLeft: '4px solid',
              color: '#333',
              borderRadius: '4px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
              lineHeight: '1.4'
            }}
          >

            {/* Explicação cadastrada para auxiliar o usuário na aprendizagem */}
            <strong>Explicação:</strong>

            {q.comentario ||
              'Nenhuma explicação cadastrada para esta questão.'}

          </div>
        </div>
      )}
    </div>
  );
}