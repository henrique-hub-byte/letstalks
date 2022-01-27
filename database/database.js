const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'Anfield_893', {
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;
