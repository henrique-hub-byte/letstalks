const express = require("express"); // importando o modulo do express
const app = express(); //
app.set('view engine','ejs'); //dizendo para o express usar ejs
app.use(express.static('public'));

app.get("/:nome/:lang",(req, res) => { // rota
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;
    var outro = "outro";
    var produtos = [
        {nome: "doritos", preco: 10.00},
        {nome: "coca-cola", preco: 8.50},
        {nome: "leite", preco: 5.00},
        {nome: "cerveja", preco: 5.00}
    ]

    res.render("index",{
        nome: nome,
        lang: lang,
        empresa:"guia do programador",
        inscritos:30,
        msg: exibirMsg,
        produtos: produtos,
        outro: outro
    })
});

app.listen(9090,()=>{
    console.log("app rodando");
});

