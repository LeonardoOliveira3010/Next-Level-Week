const addTime = document.querySelector("#add-time")

addTime.addEventListener('click', () =>{
    const newFieldsContainer = document.querySelector(".schedule-item").cloneNode(true)

    const fields = newFieldsContainer.querySelectorAll("input")

    fields.forEach(function(field){
        field.value = ""
    })
    document.querySelector("#schedule-items").appendChild(newFieldsContainer)
})