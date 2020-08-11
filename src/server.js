// SERVIDOR
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

// IMPORTAÇÃO DE MODULOS
const { subjects, weekDays, getSubject } = require('./utils/format')
const { pageLanding, pageStudy, pageGiveClasses, saveGiveClasses } = require('./pages')
const { urlencoded } = require('express')

//Configuração do nunjucks
nunjucks.configure('src/views', {
    express: app,
    noCache: true,
})

// RECEBER OS DADOS DO BODY
app.use(express.urlencoded({extended: true}))

// Todos os arquivos estaticos (img, css, scripts) coloca o nome da pasta
app.use(express.static("public"))


//ROTAS DA APLICAÇÃO (Está dentro das funções na pasta pages.js)
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveGiveClasses)

// Configuração do servidor.
app.listen(5500, function(){
    console.log('Server http://localhost:5500')
})