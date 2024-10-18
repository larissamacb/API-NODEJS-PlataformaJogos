const { Sequelize } = require('sequelize');

const loginDB = new Sequelize('login', 'postgres', '01032005', {
  host: 'localhost',
  dialect: 'postgres',
});

const jogosDB = new Sequelize('jogos', 'postgres', '01032005', {
  host: 'localhost',
  dialect: 'postgres',
});

const geralDB = new Sequelize('geral', 'postgres', '01032005', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  loginDB,
  jogosDB,
  geralDB
};
