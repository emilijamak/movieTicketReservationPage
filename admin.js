import { addMovie as addMovieFunction } from "./module.js";
import {greetUser as greetUser} from "./module.js";
import {logOut as logOut} from "./module.js";

const currentUser = localStorage.getItem("user");
const optionsDiv = document.querySelector('.options');
const movieListCont = document.querySelector('.movieListCont');
const movieCont = document.querySelector('.movieCont');
const goBackButton = document.querySelector(".goBack");
const goBackButton2 = document.querySelector(".goBack2");
const checkMovieList = document.querySelector('.movieList');
const addMovie = document.querySelector('.createMovie');
const addMovieCont = document.querySelector('.addMovieCont');
const container = document.querySelector('.cont');
let movieList = JSON.parse(localStorage.getItem("movieList")) || [];





if (currentUser === "admin") {
    optionsDiv.style.display = "flex";
} else {
    optionsDiv.style.display = "none";
    movieListCont.style.display = "flex";
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
                    ${currentUser === "admin" ? `<div class="button btn btn-outline-light delete" data-index="${index}"><p>DELETE</p></div>` : ''}
                </div>
            </div>
        `;
    });

    const buttons = document.querySelectorAll('.delete');
    buttons.forEach(button => {
        button.onclick = (e) => {
            console.log('works');
            e.stopPropagation();
            const movieTitle = e.target.closest('.movie').querySelector('h4').textContent; // Get the title of the movie associated with the clicked delete button
            movieList = movieList.filter(movie => movie.title !== movieTitle);
            localStorage.setItem('movieList', JSON.stringify(movieList));
            appendMovies();
        };
    });



    addSeatingPlan(movieList);
    registerMovieClickEvents();

}

function registerMovieClickEvents() {
    const movies = document.querySelectorAll('.movie');
    movies.forEach((movieElem, index) => {
        movieElem.onclick = () => {
            const selectedMovie = movieList[index];
            movieListCont.style.display = "none";
            container.style.display = "flex";

            container.innerHTML = `
                <div class="d-flex">
                <i class="fa-solid fa-arrow-left mb-1 mt-2 ms-2 backToList"></i>
                </div>
                <div class="left d-flex justify-content-center align-items-center flex-column">
                    <img src="${selectedMovie.movieCover}" alt="">
                </div>
                <div class="right d-flex flex-column align-items-center gap-3">
                    <h1>${selectedMovie.title}</h1>
                    <div class="sittingPlan"></div>
                    <div class="btn btn-outline-light reserve">Reserve Seats</div>
                    ${currentUser === "admin" ? `<div class="btn btn-outline-light cancel">Cancel reservation</div>` : ''}
                </div>
            `;
            const backToListButton = document.querySelector('.backToList');
            backToListButton.onclick = () => {
                container.style.display = "none";
                movieListCont.style.display = "flex";
            };

            appendSeats(selectedMovie);

            const reserveButton = document.querySelector('.reserve');
            const cancelButton = document.querySelector('.cancel');

            reserveButton.onclick = () => {
                let reservedSeatsCount = 0;
                document.querySelectorAll('.seat').forEach((seat, seatIndex) => {
                    if (seat.classList.contains('picked')) {
                        seat.classList.add('reserved');
                        seat.classList.remove('picked');
                        selectedMovie.seatingPlan[seatIndex].reserved = true;
                        reservedSeatsCount++;
                    }
                });
                selectedMovie.seatsTaken += reservedSeatsCount;
                updateMovie(selectedMovie);
                updateFreeSeatsDisplay(selectedMovie, index);
            };

            if (cancelButton) {
                cancelButton.onclick = () => {
                    let canceledSeatsCount = 0;
                    document.querySelectorAll('.seat').forEach((seat, seatIndex) => {
                        if (seat.classList.contains('marked-for-cancel')) {
                            seat.classList.remove('reserved');
                            seat.classList.remove('marked-for-cancel');
                            selectedMovie.seatingPlan[seatIndex].reserved = false;
                            canceledSeatsCount++;
                        }
                    });
                    selectedMovie.seatsTaken -= canceledSeatsCount;
                    updateMovie(selectedMovie);
                    updateFreeSeatsDisplay(selectedMovie, index);
                };
            }
        };
    });
}

function updateFreeSeatsDisplay(movie, index) {
    const freeSeats = movie.seats - movie.seatsTaken;
    const movieElem = document.querySelectorAll('.movie')[index];
    const seatsDisplay = movieElem.querySelector('h6');
    seatsDisplay.textContent = `(${freeSeats}/${movie.seats})`;
}

function appendSeats(movie) {
    const seats = document.querySelector('.sittingPlan');
    seats.innerHTML = '';

    movie.seatingPlan.forEach((el, seatIndex) => {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        if (el.reserved) {
            seat.classList.add('reserved');
        }
        seat.innerText = seatIndex + 1;
        seat.onclick = () => {
            if (seat.classList.contains('reserved')) {
                seat.classList.toggle('marked-for-cancel');
            } else if (!seat.classList.contains('reserved')) {
                seat.classList.add('picked');
            }
        };
        seats.appendChild(seat);
    });
}

function updateMovie(updatedMovie) {
    const indexToUpdate = movieList.findIndex(movie => movie.title === updatedMovie.title);
    if (indexToUpdate !== -1) {
        movieList[indexToUpdate] = updatedMovie;
        localStorage.setItem("movieList", JSON.stringify(movieList));
    }
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
document.addEventListener("DOMContentLoaded", function() {
    logOut();
});
greetUser()
goBack();
addMovieFunction(movieList);
appendMovies()

