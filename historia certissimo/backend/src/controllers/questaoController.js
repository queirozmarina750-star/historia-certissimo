const questoesModel = require('../models/questoesModels'); // Importa o model das questões

const listarQuestoes = async (req, res) => {
  try {
    const { vestibular, ano, topico, dificuldade } = req.query; // Recebe os filtros da requisição
    
    const questoes = await questoesModel.buscarComFiltros({
      vestibular,
      ano,
      topico,
      dificuldade
    }); // Busca as questões com os filtros

    res.json(questoes); // Retorna as questões encontradas
  } catch (error) {
    console.error("Erro no controller:", error); // Exibe o erro no console
    res.status(500).json({ error: 'Erro ao buscar questões no banco de dados.' }); // Retorna erro
  }
};

module.exports = { listarQuestoes }; // Exporta a função