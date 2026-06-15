const jwt = require('jsonwebtoken'); // Importa a biblioteca JWT

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtém o cabeçalho Authorization
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' }); // Verifica se o token existe
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET); // Valida o token
    req.usuario = verificado; // Salva os dados do usuário na requisição
    next(); // Continua para a próxima rota
  } catch (err) {
    res.status(403).json({ error: 'Token inválido ou expirado.' }); // Retorna erro se o token for inválido
  }
};