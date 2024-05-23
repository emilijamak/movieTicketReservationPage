const currentUser = localStorage.getItem("user")
const container = document.querySelector('.cont')
const reserveButton = document.querySelector('.reserve')
const cancelButton = document.querySelector('.cancel')

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
            <div class="sittingPlan"></div>
            <div class="btn btn-outline-light reserve">Reserve Seats</div>
            ${currentUser === "admin" ? `<div class="btn btn-outline-light cancel">Cancel reservation</div>` : ''}
        </div>
        `
}
function appendSeats() {
    const seats = document.querySelector('.sittingPlan')
    console.log(currentMovie.seats)
    currentMovie.seatingPlan.forEach(seat => {
    })

    for (let i = 0; i < currentMovie.seats; i++) {
        const seat = document.createElement('div')
        seat.classList.add('seat')
        seats.appendChild(seat)
    }
    const allSeats = document.querySelectorAll('.seat')
    allSeats.forEach((seat, index) => {
        seat.innerText = index
        seat.onclick = () => {
            if (!seat.classList.contains('reserved')) {
                allSeats.forEach(seat => seat.classList.remove('picked'))
                seat.classList.add('picked')
            }

        }
    })


}

function reserveSeat() {
    const allSeats = document.querySelectorAll('.seat')

}

appendCurrentMovie()
appendSeats()
