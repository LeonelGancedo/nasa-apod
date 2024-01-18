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

        const img0 = document.getElementById('img0')
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const img3 = document.getElementById('img3')
        const img4 = document.getElementById('img4')
        const img5 = document.getElementById('img5')
        const img6 = document.getElementById('img6')
        const img7 = document.getElementById('img7')
        const img8 = document.getElementById('img8')
        const img9 = document.getElementById('img9')

        const fig0 = document.getElementById('fig0')
        const fig1 = document.getElementById('fig1')
        const fig2 = document.getElementById('fig2')
        const fig3 = document.getElementById('fig3')
        const fig4 = document.getElementById('fig4')
        const fig5 = document.getElementById('fig5')
        const fig6 = document.getElementById('fig6')
        const fig7 = document.getElementById('fig7')
        const fig8 = document.getElementById('fig8')
        const fig9 = document.getElementById('fig9')



        img0.src = data[0].thumbnail_url ? data[0].thumbnail_url : data[0].url
        img1.src = data[1].thumbnail_url ? data[1].thumbnail_url : data[1].url
        img2.src = data[2].thumbnail_url ? data[2].thumbnail_url : data[2].url
        img3.src = data[3].thumbnail_url ? data[3].thumbnail_url : data[3].url
        img4.src = data[4].thumbnail_url ? data[4].thumbnail_url : data[4].url
        img5.src = data[5].thumbnail_url ? data[5].thumbnail_url : data[5].url
        img6.src = data[6].thumbnail_url ? data[6].thumbnail_url : data[6].url
        img7.src = data[7].thumbnail_url ? data[7].thumbnail_url : data[7].url
        img8.src = data[8].thumbnail_url ? data[8].thumbnail_url : data[8].url
        img9.src = data[9].thumbnail_url ? data[9].thumbnail_url : data[9].url

        fig0.innerHTML = data[0].date
        fig1.innerHTML = data[1].date
        fig2.innerHTML = data[2].date
        fig3.innerHTML = data[3].date
        fig4.innerHTML = data[4].date
        fig5.innerHTML = data[5].date
        fig6.innerHTML = data[6].date
        fig7.innerHTML = data[7].date
        fig8.innerHTML = data[8].date
        fig9.innerHTML = data[9].date

        

        console.log(data[0].url);
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