const pool = require('../config/databese');

// ============================================================
// LISTAR TODAS AS QUESTÕES
// ============================================================

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM boavisao'
  );

  return result.rows;
}

// ============================================================
// BUSCAR POR VESTIBULAR
// ============================================================

async function buscarPorVestibular(nome_vestibular) {

  const result = await pool.query(
    'SELECT * FROM boavisao WHERE nome_vestibular ILIKE $1',
    [`%${nome_vestibular}%`]
  );

  return result.rows;
}

// ============================================================
// BUSCAR POR TÓPICO
// ============================================================

async function buscarPorTopico(nome_topico) {

  const result = await pool.query(
    'SELECT * FROM boavisao WHERE nome_topico ILIKE $1',
    [`%${nome_topico}%`]
  );

  return result.rows;
}

// ============================================================
// BUSCAR POR DIFICULDADE
// ============================================================

async function buscarPorDificuldade(dificuldade) {

  const result = await pool.query(
    'SELECT * FROM boavisao WHERE dificuldade ILIKE $1',
    [`%${dificuldade}%`]
  );

  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorVestibular,
  buscarPorTopico,
  buscarPorDificuldade
};