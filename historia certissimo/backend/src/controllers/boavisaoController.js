const BoavisaoModel = require('../models/boavisaoModels');

// ============================================================
// LISTAR TODAS AS QUESTÕES
// GET /boavisao
// ============================================================

async function listarTodos(req, res) {

  try {

    const questoes = await BoavisaoModel.listarTodos(); // Busca todas as questões

    res.status(200).json(questoes); // Retorna as questões

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao listar questões',
      erro: erro.message
    }); // Retorna erro

  }

}

// ============================================================
// BUSCAR POR VESTIBULAR
// GET /boavisao/vestibular/:nome
// ============================================================

async function buscarPorVestibular(req, res) {

  try {

    const { nome } = req.params; // Recebe o nome do vestibular

    const questoes =
      await BoavisaoModel.buscarPorVestibular(nome); // Busca por vestibular

    res.status(200).json(questoes); // Retorna resultado

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar vestibular',
      erro: erro.message
    }); // Retorna erro

  }

}

// ============================================================
// BUSCAR POR TÓPICO
// GET /boavisao/topico/:nome
// ============================================================

async function buscarPorTopico(req, res) {

  try {

    const { nome } = req.params; // Recebe o tópico

    const questoes =
      await BoavisaoModel.buscarPorTopico(nome); // Busca por tópico

    res.status(200).json(questoes); // Retorna resultado

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar tópico',
      erro: erro.message
    }); // Retorna erro

  }

}

// ============================================================
// BUSCAR POR DIFICULDADE
// GET /boavisao/dificuldade/:nivel
// ============================================================

async function buscarPorDificuldade(req, res) {

  try {

    const { nivel } = req.params; // Recebe a dificuldade

    const questoes =
      await BoavisaoModel.buscarPorDificuldade(nivel); // Busca por dificuldade

    res.status(200).json(questoes); // Retorna resultado

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar dificuldade',
      erro: erro.message
    }); // Retorna erro

  }

}

module.exports = {
  listarTodos,
  buscarPorVestibular,
  buscarPorTopico,
  buscarPorDificuldade
}; // Exporta as funções