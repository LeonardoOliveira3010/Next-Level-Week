const express = require('express')
const app = express()

// Todos os arquivos estaticos (img, css, cores etc) coloca o nome da pasta
app.use(express.static("public"))

// Rotas
app.get('/',(req, res) =>{
    return res.sendFile(__dirname + "/views/index.html")
})


















// Configuração do servidor.
app.listen(5500, function(){
    console.log('Server http://localhost:5500')
})