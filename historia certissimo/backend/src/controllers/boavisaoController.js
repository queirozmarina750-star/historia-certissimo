const BoavisaoModel = require('../models/boavisaoModels');

// ============================================================
// LISTAR TODAS AS QUESTÕES
// GET /boavisao
// ============================================================

async function listarTodos(req, res) {

  try {

    const questoes = await BoavisaoModel.listarTodos();

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao listar questões',
      erro: erro.message
    });

  }

}

// ============================================================
// BUSCAR POR VESTIBULAR
// GET /boavisao/vestibular/:nome
// ============================================================

async function buscarPorVestibular(req, res) {

  try {

    const { nome } = req.params;

    const questoes =
      await BoavisaoModel.buscarPorVestibular(nome);

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar vestibular',
      erro: erro.message
    });

  }

}

// ============================================================
// BUSCAR POR TÓPICO
// GET /boavisao/topico/:nome
// ============================================================

async function buscarPorTopico(req, res) {

  try {

    const { nome } = req.params;

    const questoes =
      await BoavisaoModel.buscarPorTopico(nome);

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar tópico',
      erro: erro.message
    });

  }

}

// ============================================================
// BUSCAR POR DIFICULDADE
// GET /boavisao/dificuldade/:nivel
// ============================================================

async function buscarPorDificuldade(req, res) {

  try {

    const { nivel } = req.params;

    const questoes =
      await BoavisaoModel.buscarPorDificuldade(nivel);

    res.status(200).json(questoes);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar dificuldade',
      erro: erro.message
    });

  }

}

module.exports = {
  listarTodos,
  buscarPorVestibular,
  buscarPorTopico,
  buscarPorDificuldade
};