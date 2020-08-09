// DADOS

const proffys = [{
    name: "Leonardo Oliveira", 
    avatar: "https://avatars1.githubusercontent.com/u/65436800?s=460&u=36c13c7088da6b2ebf246f336126f9ba464aa695&v=4", 
    whatsapp: "15998582454", 
    bio:"Lorem ipsum dolor sit amet consectetur, adipisicing elit <br></br> Modi soluta odit maiores corporis tenetur placeat ullam illum, a aliquam eos nisi magni tempora neque ab sit! Reprehenderit nesciunt ea a.", 
    subject: "Matematica", 
    cost: "20", 
    weekday: [0], 
    time_from: [720], 
    time_to: [1220]
    },
{
    name: "Maykão", 
    avatar: "https://avatars1.githubusercontent.com/u/65436800?s=460&u=36c13c7088da6b2ebf246f336126f9ba464aa695&v=4", 
    whatsapp: "15998582454", 
    bio:"Lorem ipsum dolor sit amet consectetur, adipisicing elit <br></br> Modi soluta odit maiores corporis tenetur placeat ullam illum, a aliquam eos nisi magni tempora neque ab sit! Reprehenderit nesciunt ea a.", 
    subject: "Matematica", 
    cost: "20", 
    weekday: [1], 
    time_from: [720], 
    time_to: [1220]
    }
]

const subjects = [
    "Artes",
   " Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado"     
]

// SERVIDOR
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

//Configuração do nunjucks
nunjucks.configure('src/views', {
    express: app,
    noCache: true,
})

// Todos os arquivos estaticos (img, css, scripts) coloca o nome da pasta
app.use(express.static("public"))

//Funcionalidade
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

// Rotas da aplicação
app.get('/', (req, res) =>{
    return res.render("index.html")
})

app.get("/study", (req, res) =>{
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekDays})
})

app.get("/give-classes", (req, res) =>{
    const data= req.query
    const isNotEmpty = Object.keys(data).length > 0
    if(isNotEmpty){
        data.subject = getSubject(data.subject)
         // adicionar os dados a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }
    return res.render("give-classes.html", {subjects, weekDays})
})

// Configuração do servidor.
app.listen(5500, function(){
    console.log('Server http://localhost:5500')
})