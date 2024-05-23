const container = document.querySelector('.cont')


let movieList = localStorage.getItem("movieList")
movieList = JSON.parse(movieList)
let currentMovie = localStorage.getItem("currentMovie")
currentMovie = JSON.parse(currentMovie)
console.log(movieList)
console.log(currentMovie)


function appendCurrentMovie() {
    container.innerHTML =
        `
            <div class="left d-flex justify-content-center align-items-center">
            <img src=${currentMovie.movieCover} alt="">
        </div>
        <div class="right d-flex flex-column align-items-center gap-3">
            <h1>${currentMovie.title}</h1>
            <div class="seats d-flex flex-wrap"></div>
            <div class="btn btn-outline-light reserve">Reserve Seats</div>
            <div class="btn btn-outline-light cancel">Cancel reservation</div>
        </div>
        `
}
function appendSeats() {
    const seats = document.querySelector('.seats')
    console.log(currentMovie.seats)
}

appendCurrentMovie()
appendSeats()