import { addMovie as addMovieFunction } from "./module.js";
import { movieInfo as movieInfoFunction} from "./module.js";

const currentUser = localStorage.getItem("user");
const optionsDiv = document.querySelector('.options');
const movieListCont = document.querySelector('.movieListCont');
const movieCont = document.querySelector('.movieCont');
const goBackButton = document.querySelector(".goBack");
const goBackButton2 = document.querySelector(".goBack2");
const checkMovieList = document.querySelector('.movieList');
const addMovie = document.querySelector('.createMovie');
const addMovieCont = document.querySelector('.addMovieCont');
console.log(currentUser);

let movieList = JSON.parse(localStorage.getItem("movieList")) || [];

if (currentUser === "admin") {
    optionsDiv.style.display = "flex";
    addMovieCont.style.display = "none";
} else {
    optionsDiv.style.display = "none";
    movieListCont.style.display = "flex";
    addMovieCont.style.display = "none";
    goBackButton.style.display = "none";
}

checkMovieList.onclick = () => {
    optionsDiv.style.display = "none";
    movieListCont.style.display = "flex";
};

addMovie.onclick = () => {
    optionsDiv.style.display = "none";
    addMovieCont.style.display = "flex";
};

function appendMovies() {
    movieCont.innerHTML = "";

    movieList.forEach((movie, index) => {
        let freeSeats = movie.seats - movie.seatsTaken;
        movieCont.innerHTML += `
            <div class="movie d-flex flex-column justify-content-center align-items-center">
                <img src=${movie.movieCover} alt="">
                <div class="title d-flex flex-column align-items-center">
                    <h4>${movie.title}</h4>
                    <h5>Seats available</h5>
                    <h6>(${freeSeats}/${movie.seats})</h6>
                    ${currentUser === "admin" ? `<div class="button btn btn-outline-light" data-index="${index}">DELETE</div>` : ''}
                </div>
            </div>
        `;
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.onclick = (e) => {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            movieList = movieList.filter((_, movieIndex) => movieIndex !== index);
            appendMovies();
            localStorage.setItem('movieList', JSON.stringify(movieList));
        };
    });

    addSeatingPlan(movieList);

}

function goBack() {
    goBackButton.onclick = () => {
        movieListCont.style.display = "none";
        optionsDiv.style.display = "flex";
    };

    goBackButton2.onclick = () => {
        addMovieCont.style.display = "none";
        optionsDiv.style.display = "flex";
    };
}

function addSeatingPlan(movieList) {
    movieList.forEach(movie => {
        if (!movie.seatingPlan) {
            const seatingPlan = Array.from({ length: movie.seats }, (_, index) => ({ id: index + 1, reserved: false }));
            movie.seatingPlan = seatingPlan;
        }
    });
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

console.log(movieList);

appendMovies();
goBack();
addMovieFunction(movieList);
movieInfoFunction(movieList);
console.log(movieList);
