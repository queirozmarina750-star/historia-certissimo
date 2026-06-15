const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { usuario, senha } = req.body; // Recebe usuário e senha enviados na requisição

  // Substitua pela validação do seu banco se preferir
  if (usuario === 'admin' && senha === '123456') { // "O usuário é igual a 'admin' E a senha é igual a '123456'?"
    const token = jwt.sign({ user: usuario }, process.env.JWT_SECRET, { expiresIn: '2h' }); // Gera um token JWT válido por 2 horas
    return res.json({ token }); // Retorna o token para o cliente
  }

  return res.status(401).json({ error: 'Usuário ou senha inválidos.' }); 
};

module.exports = { login }; // Exporta a função de login