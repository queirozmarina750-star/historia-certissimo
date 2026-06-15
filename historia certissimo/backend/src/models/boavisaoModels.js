const pool = require('../config/databese'); // Importa a conexão com o banco

// ============================================================
// LISTAR TODAS AS QUESTÕES
// ============================================================

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM boavisao' // Busca todas as questões
  );

  return result.rows; // Retorna os resultados
}

// ============================================================
// BUSCAR POR VESTIBULAR
// ============================================================

async function buscarPorVestibular(nome_vestibular) {

  const result = await pool.query(
    'SELECT * FROM boavisao WHERE nome_vestibular ILIKE $1',
    [`%${nome_vestibular}%`] // Filtra pelo vestibular
  );

  return result.rows; // Retorna os resultados
}

// ============================================================
// BUSCAR POR TÓPICO
// ============================================================

async function buscarPorTopico(nome_topico) {

  const result = await pool.query(
    'SELECT * FROM boavisao WHERE nome_topico ILIKE $1',
    [`%${nome_topico}%`] // Filtra pelo tópico
  );

  return result.rows; // Retorna os resultados
}

// ============================================================
// BUSCAR POR DIFICULDADE
// ============================================================

async function buscarPorDificuldade(dificuldade) {

  const result = await pool.query(
    'SELECT * FROM boavisao WHERE dificuldade ILIKE $1',
    [`%${dificuldade}%`] // Filtra pela dificuldade
  );

  return result.rows; // Retorna os resultados
}

module.exports = {
  listarTodos,
  buscarPorVestibular,
  buscarPorTopico,
  buscarPorDificuldade
}; // Exporta as funções