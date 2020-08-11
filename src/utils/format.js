// DADOS
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

//Funcionalidade
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(':')
    return Number((hour * 60) + minutes)
}

module.exports = {subjects, weekDays, getSubject, convertHoursToMinutes}