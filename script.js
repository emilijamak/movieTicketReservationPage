
const userButton = document.querySelector('.user')
const adminButton = document.querySelector('.admin')

// let movieList = [
//     {   title: "Challengers",
//         movieCover: "https://upload.wikimedia.org/wikipedia/en/b/b4/Challengers_2024_poster.jpeg",
//         seats: 10,
//         seatsTaken: 0,
//         seatingPlan: [{id: 1, reserved: false}, {id: 2, reserved: false}, {id: 3, reserved: false},{id: 4, reserved: false},{id: 5, reserved: false},{id: 6, reserved: false},{id: 7, reserved: false},{id: 8, reserved: false},{id: 9, reserved: false},{id: 10, reserved: false},]
//
//     },
//     {   title: "Dune",
//         movieCover: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
//         seats: 10,
//         seatsTaken: 0,
//         seatingPlan: [{id: 1, reserved: false}, {id: 2, reserved: false}, {id: 3, reserved: false},{id: 4, reserved: false},{id: 5, reserved: false},{id: 6, reserved: false},{id: 7, reserved: false},{id: 8, reserved: false},{id: 9, reserved: false},{id: 10, reserved: false},]
//
//     },
//     {   title: "Poor Things",
//         movieCover: "https://knightkrier.com/wp-content/uploads/2024/01/IMG_0163-840x1200.jpeg",
//         seats: 10,
//         seatsTaken: 0,
//         seatingPlan: [{id: 1, reserved: false}, {id: 2, reserved: false}, {id: 3, reserved: false},{id: 4, reserved: false},{id: 5, reserved: false},{id: 6, reserved: false},{id: 7, reserved: false},{id: 8, reserved: false},{id: 9, reserved: false},{id: 10, reserved: false},]
//     },
// ]
//
// localStorage.setItem('movieList', JSON.stringify(movieList))
//

userButton.onclick = () => {
    let currentUser = "user"
    localStorage.setItem("user", currentUser)
    console.log(currentUser)
    window.location.href = "adminIndex.html"
}
adminButton.onclick = () => {
    let currentUser = "admin"
    localStorage.setItem("user", currentUser)
    console.log(currentUser)
    window.location.href = "adminIndex.html"
}