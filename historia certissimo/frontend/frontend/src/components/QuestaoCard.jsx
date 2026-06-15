import React from 'react';

export default function QuestaoCard({ q, index, respostaUsuario, onChangeResposta, corrigido }) {
  const letraCorreta = (q.letra_correta || 'A').trim().toUpperCase();

  const obterEstiloLabel = (letraOpcao) => {
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

    if (!corrigido) return padrao;

    // Se a alternativa for a correta -> SEMPRE VERDE
    if (letraOpcao === letraCorreta) {
      return { ...padrao, backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', fontWeight: 'bold' };
    }
    // Se o usuário clicou nessa alternativa e ela estava errada -> VERMELHA
    if (respostaUsuario === letraOpcao && respostaUsuario !== letraCorreta) {
      return { ...padrao, backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24' };
    }
    return padrao;
  };

  return (
    <div style={{ background: '#f9f9f9', border: '1px solid #ddd', padding: '20px', marginBottom: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5', color: '#222' }}><strong>Questão {index + 1}:</strong> {q.enunciado}</p>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0' }}>
        <span style={{ fontSize: '0.75em', background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', color: '#495057', fontWeight: 'bold' }}>{q.nome_vestibular}</span>
        <span style={{ fontSize: '0.75em', background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', color: '#495057' }}>Ano: {q.ano}</span>
        <span style={{ fontSize: '0.75em', background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', color: '#495057' }}>Tema: {q.nome_topico}</span>
        <span style={{ fontSize: '0.75em', background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', color: '#495057' }}>Nível: {q.dificuldade}</span>
      </div>
      
      <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '15px 0' }} />
      
      <div className="opcoes">
        {['A', 'B', 'C', 'D', 'E'].map(letra => (
          <label key={letra} style={obterEstiloLabel(letra)}>
            <input 
              type="radio" 
              name={`questao_${q.id_questao}`} 
              value={letra}
              checked={respostaUsuario === letra}
              onChange={() => onChangeResposta(q.id_questao, letra)}
              disabled={corrigido}
              style={{ marginRight: '8px' }}
            /> <strong>{letra})</strong> Marcar Alternativa {letra}
          </label>
        ))}
      </div>

      {/* CAIXA DE FEEDBACK QUE ABRE COM COMENTÁRIOS DO POSTGRES */}
      {corrigido && (
        <div style={{
          marginTop: '15px', padding: '15px', borderRadius: '6px', border: '1px solid',
          backgroundColor: !respostaUsuario ? '#fff3cd' : respostaUsuario === letraCorreta ? '#e2f0d9' : '#fce8e6',
          borderColor: !respostaUsuario ? '#ffeeba' : respostaUsuario === letraCorreta ? '#c3e6cb' : '#f5c6cb',
          color: !respostaUsuario ? '#856404' : respostaUsuario === letraCorreta ? '#2e7d32' : '#c62828'
        }}>
          {!respostaUsuario ? (
            <p style={{ margin: '0' }}><strong>⚠️ Não respondida!</strong> O gabarito correto é a Letra {letraCorreta}.</p>
          ) : respostaUsuario === letraCorreta ? (
            <p style={{ margin: '0' }}><strong>✔ Você acertou!</strong> Parabéns.</p>
          ) : (
            <p style={{ margin: '0' }}><strong>❌ Você errou!</strong> A resposta correta é a Letra {letraCorreta}.</p>
          )}
          <div style={{ marginTop: '12px', background: '#ffffff', padding: '12px', borderLeft: '4px solid', color: '#333', borderRadius: '4px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)', lineHeight: '1.4' }}>
            <strong>Explicação:</strong> {q.comentario || 'Nenhuma explicação cadastrada para esta questão.'}
          </div>
        </div>
      )}
    </div>
  );
}