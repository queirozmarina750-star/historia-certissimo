const express = require('express');

const router = express.Router();

// ROTA DE LOGIN
router.post('/login', (req, res) => {

  const { email, senha } = req.body;

  // EXEMPLO SIMPLES
  if (email === 'admin@gmail.com' && senha === '123') {

    return res.json({
      mensagem: 'Login realizado com sucesso'
    });

  }

  return res.status(401).json({
    mensagem: 'Email ou senha inválidos'
  });

});

module.exports = router;