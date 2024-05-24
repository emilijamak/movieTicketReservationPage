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
            if (movieSeatsInput.value > 30) {
                alert('The maximum seats number is 30');
            } else {

                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

                if (!urlRegex.test(movieImageInput.value)) {
                    alert('Please enter a valid URL for the movie image');
                } else {
                    movieList.push({
                        title: movieTitleInput.value,
                        movieCover: movieImageInput.value,
                        seats: parseInt(movieSeatsInput.value, 10),
                        seatsTaken: 0
                    });
                    console.log(movieList);
                    localStorage.setItem('movieList', JSON.stringify(movieList));
                    addMovieCont.style.display = "none";
                    optionsDiv.style.display = "flex";
                    window.location.href = 'adminIndex.html';
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
    greeting.innerHTML = `<h3>Welcome, ${currentUser}</h3>`
}

export function logOut() {
    const logOutButton = document.querySelector('.logOut');

    logOutButton.onclick = (event) => {
        event.preventDefault();
        window.location.href = 'login.html';
    };
}
