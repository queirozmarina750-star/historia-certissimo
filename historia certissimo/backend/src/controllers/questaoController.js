const questoesModel = require('../models/questoesModels');

const listarQuestoes = async (req, res) => {
  try {
    const { vestibular, ano, topico, dificuldade } = req.query;
    
    const questoes = await questoesModel.buscarComFiltros({
      vestibular,
      ano,
      topico,
      dificuldade
    });

    res.json(questoes);
  } catch (error) {
    console.error("Erro no controller:", error);
    res.status(500).json({ error: 'Erro ao buscar questões no banco de dados.' });
  }
};

module.exports = { listarQuestoes };