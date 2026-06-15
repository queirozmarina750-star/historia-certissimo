const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const questoesRoutes = require('./src/routes/questoesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas do Sistema
app.use('/auth', authRoutes);
app.use('/questoes', questoesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});