const express = require('express'); // Importa o Express
const jwt = require('jsonwebtoken'); // Importa a biblioteca JWT

const router = express.Router(); // Cria o roteador

router.post('/login', (req, res) => { // Rota de login

  const { usuario, senha } = req.body; // Recebe usuário e senha

  if (usuario === 'admin' && senha === '123456') { // Verifica as credenciais

    const token = jwt.sign(
      { usuario }, // Dados armazenados no token
      'segredo', // Chave secreta
      { expiresIn: '2h' } // Validade do token
    );

    return res.json({
      token // Retorna o token
    });
  }

  return res.status(401).json({
    error: 'Usuário ou senha inválidos.' // Retorna erro de login
  });

});

module.exports = router; // Exporta as rotas