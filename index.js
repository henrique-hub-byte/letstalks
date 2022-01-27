const express = require("express"); // importando o modulo do express
const app = express(); //
//const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas");
const Resposta = require("./database/Respota");
//database

connection
    .authenticate()
    .then(() => {
        console.log("conexão feita com o banco de dados"); 
    })
    .catch((msgerro)=> {  
        console.log(msgerro);
    })

app.set('view engine','ejs'); //dizendo para o express usar ejs
app.use(express.static('public')); 

app.use(express.urlencoded({extended: true}));
app.use(express.json());
/* app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extend:false})); */

app.get("/",(req, res) => { // rota
    // equivalente select * from
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(pergunta => {
        res.render("index",{
            pergunta: pergunta
        });
    });  
});

app.get("/perguntas",(req, res) => { // rota
    res.render("perguntas"); 
});

app.post("/salvarperguntas",(req, res) => { // rota tipo post para receber rota do formulario
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({ //equivalente ao insert into
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("./")// uma barra redireciona para a page principal
    });
});

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({//metodo do sequelize
        where: {id: id} // buscar no banco o id q tenha o mesmo valor da variavel id
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [[["id", "DESC"]]]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("./")
        }
     });

    });

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=> {
        res.redirect("/pergunta/"+perguntaId);
    })
});

app.listen(9090,()=>{
    console.log("app rodando");
});