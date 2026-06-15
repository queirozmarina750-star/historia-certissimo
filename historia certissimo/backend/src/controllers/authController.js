const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { usuario, senha } = req.body;

  // Substitua pela validação do seu banco se preferir
  if (usuario === 'admin' && senha === '123456') {
    const token = jwt.sign({ user: usuario }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
};

module.exports = { login };