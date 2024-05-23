export function addMovie(arr) {
    const movieTitleInput = document.querySelector('input[id="movieTitle"]')
    const movieImageInput = document.querySelector('input[id="movieImage"]')
    const movieSeatsInput = document.querySelector('input[id="movieSeats"]')
    const submitButton = document.querySelector('input[type="submit"]')
    const addMovieCont = document.querySelector('.addMovieCont')
    const optionsDiv = document.querySelector('.options')

   submitButton.onclick = () => {
       if (movieTitleInput.value && movieImageInput.value && movieSeatsInput.value) {
           console.log('works')
           console.log(arr)
           arr.push({title: movieTitleInput.value, movieCover: movieImageInput.value, seats: movieSeatsInput.value, seatsTaken: 0})
           console.log(arr)
           localStorage.setItem('movieList', JSON.stringify(arr))
           addMovieCont.style.display = "none"
           optionsDiv.style.display = "flex"

       } else {
           alert('Fill in all the fields')
       }
   }
}


export function movieInfo(arr) {
    const movies = document.querySelectorAll('.movie')
    movies.forEach((movie, index) => {
        movie.onclick = () => {
            let currentMovie = arr[index]
            console.log(currentMovie)
            localStorage.setItem("currentMovie", JSON.stringify(currentMovie))
            window.location.href = "movie.html"
        }
    })
}