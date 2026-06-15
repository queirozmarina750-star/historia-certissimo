const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {

  const { usuario, senha } = req.body;

  if (usuario === 'admin' && senha === '123456') {

    const token = jwt.sign(
      { usuario },
      'segredo',
      { expiresIn: '2h' }
    );

    return res.json({
      token
    });
  }

  return res.status(401).json({
    error: 'Usuário ou senha inválidos.'
  });

});

module.exports = router;