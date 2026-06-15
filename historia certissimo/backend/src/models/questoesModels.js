const pool = require('../config/databese');

const buscarComFiltros = async (filtros) => {
  const { vestibular, ano, topico, dificuldade } = filtros;

  let query = `
    SELECT 
      q.id_questao, 
      q.enunciado, 
      q.dificuldade, 
      v.nome_vestibular,
      v.ano,
      t.nome_topico,

      (
        SELECT a.texto 
        FROM alternativa a 
        WHERE a.id_questao = q.id_questao AND a.correta = 'A'
        LIMIT 1
      ) AS texto_correto

    FROM questoes q
    JOIN vestibular v ON q.id_vestibular = v.id_vestibular
    JOIN topicos t ON q.id_topico = t.id_topico
    WHERE 1=1
  `;

  const params = [];
  let counter = 1;

  if (vestibular) {
    query += ` AND LOWER(v.nome_vestibular) = LOWER($${counter})`;
    params.push(vestibular);
    counter++;
  }

  if (ano) {
    query += ` AND v.ano = $${counter}`;
    params.push(parseInt(ano));
    counter++;
  }

  if (topico) {
    query += ` AND LOWER(t.nome_topico) = LOWER($${counter})`;
    params.push(topico);
    counter++;
  }

  if (dificuldade) {
    query += ` AND q.dificuldade = $${counter}`;
    params.push(dificuldade);
    counter++;
  }

  query += ` ORDER BY q.id_questao ASC`;

  const resultado = await pool.query(query, params);
  return resultado.rows;
};

module.exports = { buscarComFiltros };