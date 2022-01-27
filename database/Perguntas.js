const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta',{ //model
    titulo:{ //campos da tabela
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{ //campos da tabela
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(() => {}); // passando o model para o BD

module.exports = Pergunta;