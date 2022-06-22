//config express
const express = require("express")
const app = express()

//config express-handlebars@5.0.0
const expressHandlebars = require("express-handlebars")
app.engine("handlebars", expressHandlebars())
app.set("view engine", "handlebars")

//arquivos estaticos
const path = require("path")
app.use(express.static(path.join(__dirname + "/styles")))

//config body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

//config mysql2
const mysql2 = require("mysql2")
const database = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "grande123",
    port: 3306
})
database.query("use mysqlbase")

//config porta servidor
const porta = process.env.PORT || 8080
app.listen(porta, function(){
    console.log("SERVIDOR RODANDO NA PORTA: " + porta)
})

//urls de navegação
app.get("/", function(req, res){
    res.render("index")
})
app.get("/projetos", function(req, res){
    res.render("projetos")
})
app.get("/contato_cmg", function(req, res){
    res.render("contato")
})

//urls logins
app.post("/tentar_login", function(req, res){
        let nome = req.body.nome
        let senha = req.body.senha

        if(nome == "heitor" && senha == "grande"){
            database.query(`select * from envio` , function(erro, envios){
                res.render("envios" , {envios})
                console.log(erro)
                console.log(envios)
                console.log(nome + " " + senha)
            })
        }
        else{
            res.render("index")
            console.log(nome + " " + senha)
        }
})

//CRUD
    //Create
app.post("/add_envio", function(req, res){
        let nome = req.body.nome
        let email = req.body.email
        let assunto = req.body.assunto
        let mensagem = req.body.mensagem

        if(nome == "" || email == "" || assunto == "" || mensagem == ""){
            console.log("VALORES NÃO INSERIDOS")
        }
        else{
            console.log(nome + " " + email + " " + assunto + " " + mensagem + " INSERIDO COM SUCESSO")
        
            database.query(`insert into envio (nome, email, assunto, mensagem) 
            values ('${nome}', '${email}', '${assunto}', '${mensagem}')`, function(){
                res.render("index")
            })
        }
})
    //Delete
app.get("/delete_envio/:id", function(req, res){
        let id = req.params.id

    database.query(`delete from envio where id  =  '${id}' `, function(){
        
        //Read
        database.query(`select * from envio`, function(erro, envios){
            res.render("envios", {envios})
            console.log(erro)
        })
    })
})
    //Update
app.post("/att_envio", function(req, res){
        let id = req.body.id    
        let nome = req.body.nome
        let email = req.body.email
        let assunto = req.body.assunto
        let mensagem = req.body.mensagem

        database.query(`update envio set 
        nome = '${nome}', email = '${email}', assunto = '${assunto}', mensagem = '${mensagem}' where id = '${id}'`, 
        function(){
            database.query(`select * from envio`, function(err, envios){
                res.render("envios", {envios})
                console.log(err)
            })
        })
})