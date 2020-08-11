const Database = require('./database/db')
// IMPORTAÇÃO DA PASTA FORMAT AONDE ESTÁ SENDO FEITO UMA DESTRUTURAÇÃO
const {subjects, weekDays, getSubject, convertHoursToMinutes} = require('./utils/format')
// const { catch } = require('./database/db')
// const { catch } = require('./database/db')

// Rotas da aplicação
function pageLanding(req, res){
    return res.render("index.html")
}

// app.get('/', (req, res) =>{ })

async function pageStudy(req, res){
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekDays})
    }

    // CONVERTER HORAS EM MINUTOS
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = ${filters.subject}
    `

    // CASOS HAJA ERROS NA HORA DA CONSULTA AO BANCO DE DADOS
   try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) =>{
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filters, weekDays})

   } catch (error){
       console.log(error)
   }
}

// app.get("/study", (req, res) =>{})

function pageGiveClasses(req, res){
    // SE NÃO, MOSTRAR A PAGINA
    return res.render("give-classes.html", {subjects, weekDays})
}

async function saveGiveClasses(req, res){
    const createProffy = require('./database/createProffy')
    // const data= req.body
    // const isNotEmpty = Object.keys(data).length > 0
    // if(isNotEmpty){
    //     data.subject = getSubject(data.subject)
    //      // adicionar os dados a lista de proffys
    //     proffys.push(data)
    // }

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) =>{
        return {
            weekday,
            time_from: convertHoursToMinutes (req.body.time_from[index]),
            time_to: convertHoursToMinutes (req.body.time_to[index])
        }
    })

   try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString +=  "&weekday=" + req.body.weekday[0]
        queryString +=  "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error){
        console.log(error)
    }
}

// app.get("/give-classes", (req, res) =>{})

module.exports = {pageLanding, pageStudy, pageGiveClasses, saveGiveClasses}