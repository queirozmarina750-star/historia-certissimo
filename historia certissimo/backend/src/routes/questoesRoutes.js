// src/routes/questoesRoutes.js
const express = require('express');
const router = express.Router();
const questoesController = require('../controllers/questaoController');

// Essa rota vai receber /questoes/enem, /questoes/usp, etc.
router.get('/:vestibular', questoesController.listarQuestoes);

module.exports = router;