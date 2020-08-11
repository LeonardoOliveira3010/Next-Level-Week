module.exports =  async function(db, {proffyValue, classValue, classScheduleValues}){
    // INSERIR DADOS NA TABELA DE proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name, 
            avatar, 
            whatsapp, 
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        ); 
    `)

    const proffy_id = insertedProffy.lastID

    // INSERÇÃO DE DADOS NA TABELA CLASSES
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    
    const class_id = insertedClass.lastID

    // INSERÇÃO DE DADOS NA TABELA SCHEDULE
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) =>{
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );

        `)
    })

    // AQUI SERÁ EXECUTADO TODOS OS db.run() DAS CLASS_SCHEDULES
   await Promise.all(insertedAllClassScheduleValues)
}
