const express = require('express');
const { loginDB, jogosDB, geralDB } = require('./config/databases');
const planoRoutes = require('./routes/planoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const jogoRoutes = require('./routes/jogoRoutes');

const app = express();
app.use(express.json());

async function testConnections() {
  try {
    await loginDB.authenticate();
    console.log('Conexão com o banco de dados de login estabelecida com sucesso.');

    await jogosDB.authenticate();
    console.log('Conexão com o banco de dados de jogos estabelecida com sucesso.');

    await geralDB.authenticate();
    console.log('Conexão com o banco de dados geral estabelecida com sucesso.');
  } catch (err) {
    console.error('Não foi possível conectar aos bancos de dados:', err);
  }
}
testConnections();

app.use('/planos', planoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/jogos', jogoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
