const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS
const authRoutes = require('./src/routes/authRoutes'); // Importa as rotas de autenticação
const questoesRoutes = require('./src/routes/questoesRoutes'); // Importa as rotas de questões

const app = express(); // Cria a aplicação

app.use(cors()); // Habilita o CORS
app.use(express.json()); // Permite receber JSON

// Rotas do Sistema
app.use('/auth', authRoutes); // Define as rotas de autenticação
app.use('/questoes', questoesRoutes); // Define as rotas de questões

const PORT = process.env.PORT || 3000; // Define a porta

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`); // Inicia o servidor
});