const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) =>{
    // INSERIR DADOS
    proffyValue = {
        name: "Leonardo Oliveira", 
        avatar: "https://avatars1.githubusercontent.com/u/65436800?s=460&u=36c13c7088da6b2ebf246f336126f9ba464aa695&v=4", 
        whatsapp: "15998582454", 
        bio:"Lorem ipsum dolor sit amet consectetur, adipisicing elit <br></br> Modi soluta odit maiores corporis tenetur placeat ullam illum, a aliquam eos nisi magni tempora neque ab sit! Reprehenderit nesciunt ea a."
    }

    classValue = {
        subject: 1, 
        cost: "20", 
        // O ID do professor irá vir pelo banco de dados

    }

    classScheduleValues = [
        // O CLASS_ID irá vir pelo banco de dados
        {
            weekday: 0, 
            time_from: 720, 
            time_to: 1220
        },

        {
            weekday: 0, 
            time_from: 520, 
            time_to: 1200
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})
    // CONSULTAR OS DADOS INSERIDOS

    // CONSULTAR DADOS DOS PROFFYS
    const selectedProffys = await db.all("SELECT * FROM proffys")
    
    //CONSULTAR AS CLASSES DE UM DETERMINADO PROFESSOR
    // E TRAZER JUNTO OS DADOS DO PROFESSOR
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

   // console.log(selectClassAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "500"
        AND class_schedule.time_to > "520"
    `)

    // console.log(selectClassesSchedules)
})