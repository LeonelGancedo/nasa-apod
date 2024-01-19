// Declaraciones iniciales
const URL = 'https://api.nasa.gov/planetary/apod?api_key=sDzcmPCllOQJdhFg1x68MUeiIqbI1XI6hJ28AXXP'
const buttonId = document.getElementById('button')
const buttonId2 = document.getElementById('button2')
let datePre = new Date().getTime()
let dateCheck = new Date().getTime()
const diaResta = 24 * 60 * 60 * 1000
const diasResta = 10 * 24 * 60 * 60 * 1000


// Funciones
const initialPicture = async (ulrApi) => {
    try {
        const response = await fetch(ulrApi)
        const data = await response.json()
        const img = document.getElementById('mainImg')
        const fechaid = document.querySelector('#fecha')
        const description = document.getElementById('explanation')
        img.src = data.thumbnail_url ? data.thumbnail_url : data.url
        fechaid.innerHTML = data.date
        description.innerHTML = data.explanation
        console.log(data.url);
    }
    catch (error) {
        console.error(error);
    }
}
const dateFormat = (newDate) => {
    const newDateToFormat = new Date(newDate)
    const year = newDateToFormat.getFullYear().toString()
    const monthError = (newDateToFormat.getMonth()+1).toString()
    const month = monthError.length === 1 ? `0${monthError}` : monthError
    const dayError = newDateToFormat.getDate().toString()
    const day = dayError.length === 1 ? `0${dayError}` : dayError
    const date = `${year}-${month}-${day}`
    return date
}
const lastPictures = async (ulrApi) => {
    try {
        const response = await fetch(ulrApi)
        const dataUn = await response.json()
        const data = dataUn.sort((a,b) => new Date(b.date) - new Date(a.date))
        const lastdays = document.getElementById('lastDaysImgs')
        data.forEach(element => {
            const figu = document.createElement('figure')
            const figc = document.createElement('figcaption')
            const img = document.createElement('img')
            img.src = element.thumbnail_url ? element.thumbnail_url : element.url
            img.addEventListener('click', () => {
                datePre = new Date(element.date).getTime() + 3 * 60 * 60 * 1000
                console.log(dateFormat(datePre));
                initialPicture(`${URL}&date=${element.date}&thumbs=true`)
                window.scroll(0,0)
            })
            figc.innerHTML = element.date
            figu.append(figc, img)
            lastdays.appendChild(figu)
        })

        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}

// On load imgs
initialPicture(`${URL}&thumbs=true`)
let dateStart = dateFormat(datePre - diasResta)
let dateEnd = dateFormat(datePre - diaResta)
lastPictures(`${URL}&start_date=${dateStart}&end_date=${dateEnd}&thumbs=true`)

// Botones y events 
buttonId.addEventListener('click', e => {
    e.preventDefault()
    datePre -= diaResta
    const dateFormateado = dateFormat(datePre)
    initialPicture(`${URL}&date=${dateFormateado}&thumbs=true`)
    window.scroll(0,0)
})
buttonId2.addEventListener('click', e => {
    e.preventDefault()
    if (datePre == dateCheck) {
        return
    } else {
        datePre += diaResta
        const dateFormateado = dateFormat(datePre)
        initialPicture(`${URL}&date=${dateFormateado}&thumbs=true`)
        window.scroll(0,0)
    }

})

window.addEventListener('keydown', e => {

    if (datePre == dateCheck) {
        return
    } else {
        if (e.key == "ArrowRight") {
            datePre += diaResta
            const dateFormateado = dateFormat(datePre)
            initialPicture(`${URL}&date=${dateFormateado}&thumbs=true`)
            window.scroll(0,0)
        }
    }

})
window.addEventListener('keydown', e => {

    if (e.key == "ArrowLeft") {
            datePre -= diaResta
            const dateFormateado = dateFormat(datePre)
            initialPicture(`${URL}&date=${dateFormateado}&thumbs=true`)
            window.scroll(0,0)
    }
})