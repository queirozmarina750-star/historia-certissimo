const express = require('express'); // Importa o Express

const router = express.Router(); // Cria o roteador

// ROTA DE LOGIN
router.post('/login', (req, res) => { // Define a rota de login

  const { email, senha } = req.body; // Recebe email e senha

  // EXEMPLO SIMPLES
  if (email === 'admin@gmail.com' && senha === '123') { // Verifica as credenciais

    return res.json({
      mensagem: 'Login realizado com sucesso' // Retorna sucesso
    });

  }

  return res.status(401).json({
    mensagem: 'Email ou senha inválidos' // Retorna erro de login
  });

});

module.exports = router; // Exporta as rotas