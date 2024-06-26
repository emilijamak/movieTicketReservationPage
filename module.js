export function addMovie() {
    const movieTitleInput = document.querySelector('input[id="movieTitle"]');
    const movieImageInput = document.querySelector('input[id="movieImage"]');
    const movieSeatsInput = document.querySelector('input[id="movieSeats"]');
    const submitButton = document.querySelector('input[type="submit"]');
    const addMovieCont = document.querySelector('.addMovieCont');
    const optionsDiv = document.querySelector('.options');

    submitButton.onclick = () => {
        let movieList = JSON.parse(localStorage.getItem('movieList')) || [];  // Retrieve existing movie list

        if (movieTitleInput.value && movieImageInput.value && movieSeatsInput.value) {
            const seats = parseInt(movieSeatsInput.value, 10);

            if (seats < 1 || seats > 30) {
                alert('Please insert a number between 1 and 30');
            } else {
                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

                if (!urlRegex.test(movieImageInput.value)) {
                    alert('Please enter a valid URL for the movie image');
                } else {
                    // Check if a movie with the same title already exists
                    const existingMovie = movieList.find(movie => movie.title.toLowerCase() === movieTitleInput.value.toLowerCase());

                    if (existingMovie) {
                        alert('A movie with this title already exists. Please enter a different title.');
                    } else {
                        movieList.push({
                            title: movieTitleInput.value,
                            movieCover: movieImageInput.value,
                            seats: seats,
                            seatsTaken: 0
                        });
                        console.log(movieList);
                        localStorage.setItem('movieList', JSON.stringify(movieList));
                        addMovieCont.style.display = "none";
                        optionsDiv.style.display = "flex";
                        window.location.href = 'adminIndex.html';
                    }
                }
            }
        } else {
            alert('Fill in all the fields');
        }
    };
}




export function greetUser() {
    const logOutButton = document.querySelector('.logOut')
    const currentUser = localStorage.getItem("user");
    const greeting = document.querySelector('.greeting')
    greeting.innerHTML = `<h3>Welcome, ${currentUser}!</h3>`
}

export function logOut() {
    const logOutButton = document.querySelector('.logOut');

    logOutButton.onclick = (event) => {
        event.preventDefault();
        window.location.href = 'login.html';
    };
}
