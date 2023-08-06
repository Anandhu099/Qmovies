

const input = document.querySelector('.hero-input');
let debounceTimer;
let movieData

input.addEventListener('input', () => {
    document.getElementById("data").innerHTML = `<div><b>LOADING . . .</b></div>`;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {

        console.log(input.value);
        if (input.value) {
            fetch(`http://www.omdbapi.com/?apikey=961b9cdc&t=${input.value}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.Response === "False") {
                        document.getElementById("data").innerHTML = "";
                        document.getElementById("data").innerHTML = `<div>No search result found</div>`;
                    } else {
                        document.getElementById("data").innerHTML = "";
                        movieData = data
                        console.log(data)
                        addMovieToDOM(data.Title, data.Director, data.Poster);

                    }
                });
        } else {
            document.getElementById("data").innerHTML = ``;
        }
    }, 700);
});

const addMovieToDOM = (title, description, image) => {

    let Element = document.createElement("div");

    let innerHTML = `
        <div class="movie-card">
            <img src=${image}>
            <h2 class="movie-title">${title}</h2>
            <p class="movie-description">${description}</p>
            <button onclick="addToPlaylist()" id="addPlaylist"><b>ADD TO PLAYLIST</b></button> 
        </div>
    `;

    Element.innerHTML = innerHTML;
    document.getElementById("data").appendChild(Element);
};

const addToPlaylist = async () => {
    fetch("http://localhost:8082/v1/auth/playlist", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(movieData)
    })
    // .then(response => {
    //     if (!response.ok) {
    //         // Check if the response status is not OK (e.g., 400, 500, etc.)
    //         return response; // Return the error response as text
    //     }
    //     return response.json(); // Otherwise, return the JSON response
    // })
    .then(data => {
        if ( data.status == 400) {
            // If the response is a string (error message), show it in an alert
            alert("Movie already in Playlist");
            // window.location.reload()
        } 
        else if(data.status == 401){

            alert("Login to add movie to playlist");
            window.location.href="/frontend/login.html"
        }
        else {
            // If the response is JSON, the movie was added successfully
            alert("Added to Playlist Successfully");
            window.location.reload()
        }
    })
    .catch(error => {
        console.log(error);
        // Handle any other error that occurred during the fetch
        alert("An error occurred while adding the movie to the playlist.");
    });
};

