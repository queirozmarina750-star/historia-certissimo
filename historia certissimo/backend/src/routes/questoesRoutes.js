// src/routes/questoesRoutes.js
const express = require('express'); // Importa o Express
const router = express.Router(); // Cria o roteador
const questoesController = require('../controllers/questaoController'); // Importa o controller

// Essa rota vai receber /questoes/enem, /questoes/usp, etc.
router.get('/:vestibular', questoesController.listarQuestoes); // Chama a função para listar questões

module.exports = router; // Exporta as rotas