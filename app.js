const express = require('express');
const { loginDB, jogosDB, geralDB } = require('./config/databases');
const planoRoutes = require('./routes/planoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const jogoRoutes = require('./routes/jogoRoutes');
const amizadeRoutes = require('./routes/amizadeRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const fotoPerfilRoutes = require('./routes/fotoPerfilRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const midiaJogoRoutes = require('./routes/midiaJogoRoutes');
const dispositivoRoutes = require('./routes/dispositivoRoutes');

const cors = require('cors')
const app = express();

const session = require('express-session');
app.use(session({
  secret: 'chave secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(cors());
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
app.use('/amizades', amizadeRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/fotosdeperfil', fotoPerfilRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/midias', midiaJogoRoutes)
app.use('/dispositivos', dispositivoRoutes)

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/perfil/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/tela-perfil.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/usuario/logado', (req, res) => {
  if (req.session.idUsuario) {
    return res.status(200).json({ idUsuario: req.session.idUsuario });
  } else {
    return res.status(401).json({ message: 'Usuário não está logado' });
  }
});
