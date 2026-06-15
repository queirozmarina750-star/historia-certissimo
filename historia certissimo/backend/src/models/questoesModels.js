const pool = require('../config/databese'); // Importa a conexão com o banco

const buscarComFiltros = async (filtros) => {
  const { vestibular, ano, topico, dificuldade } = filtros; // Recebe os filtros

  let query = `
    SELECT
      q.id_questao,
      q.enunciado,
      q.dificuldade,
      v.nome_vestibular,
      v.ano,
      t.nome_topico,
      a.texto AS texto_correto,
      a.correta,
      a.comentario
    FROM questoes q
    JOIN vestibular v
      ON q.id_vestibular = v.id_vestibular
    JOIN topicos t
      ON q.id_topico = t.id_topico
    LEFT JOIN alternativa a
      ON a.id_questao = q.id_questao
    WHERE 1=1
  `; // Monta a consulta inicial

  const params = []; // Armazena os parâmetros
  let counter = 1; // Controla a posição dos parâmetros

  if (vestibular) {
    query += ` AND LOWER(v.nome_vestibular) = LOWER($${counter})`; // Filtra por vestibular
    params.push(vestibular);
    counter++;
  }

  if (ano) {
    query += ` AND v.ano = $${counter}`; // Filtra por ano
    params.push(parseInt(ano));
    counter++;
  }

  if (topico) {
    query += ` AND LOWER(t.nome_topico) = LOWER($${counter})`; // Filtra por tópico
    params.push(topico);
    counter++;
  }

  if (dificuldade) {
    query += ` AND LOWER(q.dificuldade) = LOWER($${counter})`; // Filtra por dificuldade
    params.push(dificuldade);
    counter++;
  }

  query += ` ORDER BY q.id_questao ASC`; // Ordena pelo ID

  const resultado = await pool.query(query, params); // Executa a consulta

  return resultado.rows; // Retorna os resultados
};

module.exports = { buscarComFiltros }; // Exporta a função