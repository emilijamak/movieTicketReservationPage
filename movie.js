const currentUser = localStorage.getItem("user");
const container = document.querySelector('.cont');

let movieList = localStorage.getItem("movieList");
movieList = JSON.parse(movieList);
let currentMovie = localStorage.getItem("currentMovie");
currentMovie = JSON.parse(currentMovie);
console.log(movieList);
console.log(currentMovie);

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
        `;
}

function appendSeats() {
    const seats = document.querySelector('.sittingPlan');
    seats.innerHTML = '';

    currentMovie.seatingPlan.forEach((el, index) => {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        if (el.reserved) {
            seat.classList.add('reserved');
        }
        seat.innerText = index + 1;
        seat.onclick = () => {
            if (seat.classList.contains('reserved')) {
                seat.classList.toggle('marked-for-cancel');
            } else if (!seat.classList.contains('reserved')) {
                document.querySelectorAll('.seat').forEach(s => s.classList.remove('picked'));
                seat.classList.add('picked');
            }
        };
        seats.appendChild(seat);
    });
}

appendCurrentMovie();
appendSeats();

const reserveButton = document.querySelector('.reserve');
const cancelButton = document.querySelector('.cancel');

reserveButton.onclick = () => {
    document.querySelectorAll('.seat').forEach((seat, index) => {
        if (seat.classList.contains('picked')) {
            seat.classList.add('reserved');
            seat.classList.remove('picked');
            currentMovie.seatingPlan[index].reserved = true;
            localStorage.setItem("currentMovie", JSON.stringify(currentMovie));
        }

    });
    console.log(currentMovie.seatingPlan)
    updateMovie()
};

if (cancelButton) {
    cancelButton.onclick = () => {
        document.querySelectorAll('.seat').forEach((seat, index) => {
            if (seat.classList.contains('marked-for-cancel')) {
                seat.classList.remove('reserved');
                seat.classList.remove('marked-for-cancel');
                currentMovie.seatingPlan[index].reserved = false;
                localStorage.setItem("currentMovie", JSON.stringify(currentMovie));
            }
        });
        console.log(currentMovie.seatingPlan)
        updateMovie()
    };

}

function updateMovie() {
    const indexToUpdate = movieList.findIndex(movie => movie.title === currentMovie.title);
    if (indexToUpdate !== -1) {
        movieList[indexToUpdate] = currentMovie;
        console.log(indexToUpdate)
        localStorage.setItem("movieList", JSON.stringify(movieList));

    }
}

